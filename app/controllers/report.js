const router = require('express').Router(),
    passport = require('passport'),
    Report = require('mongoose').model('Report'),
    Video = require('mongoose').model('Video'),
    paginate = require('express-paginate');

const requireAuth = passport.authenticate('jwt', {session: false});

router.use(paginate.middleware(10, 50));

module.exports = function (app) {
    app.use('/api/reports', router);
};

router.route('/')
    .get((req, res, next) => {
        Report.paginate({}, {
            page: req.query.page,
            limit: req.query.limit,
            sort: req.query.sort,
        }, function (err, reports) {
            if (err) {
                res.status(422).json({
                    success: false,
                    message: err.message
                });
            }
            res.json(reports);
        })
    })
    .post((req, res, next) => {
        req.checkBody({
            'video': {
                notEmpty: true,
                errorMessage: 'Video is Required'
            },
            'email': {
                notEmpty: true,
                isEmail: {
                    errorMessage: 'Invalid Email'
                },
                errorMessage: 'Email is Required'
            },
            'name': {
                notEmpty: true,
                errorMessage: 'Name is Required'
            },
            'description': {
                notEmpty: true,
                errorMessage: 'Description is Required'
            }
        })
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                res.status(422).json(result.useFirstErrorOnly().mapped());
                return;
            }
            let report = req.body;
            console.log(report);
            Report.create(report, (err, report) => {
                if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
                res.json({success: true, message: "Report Added Successfully"})
            });
        });
    });
router.route('/:reportId')
    .get((req,res,next)=>{
        Report.findOne({_id: req.params.reportId},(err, report) => {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: err.message
                });
            }
            if (!report) {
                return res.status(404).json({success: false, message: "Report Not found"})
            }
            res.json(report);
        });
    })
    .delete((req,res,next)=>{
        Report.findOne({_id: req.params.reportId}, (err, report) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            if (!report) {
                return res.status(404).json({success: false, message: "Report Not found"})
            }
            Video.findOne({_id:report.video},(err,video)=>{
                if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
               if(video&&String(video.copyrights)===String(report._id)){
                   video.violated = false;
                   video.copyrights = null;
                   video.save((err)=>{
                       if (err) {
                           return res.status(422).json({success: false, message: err.message})
                       }
                   })
               }
                report.remove((err) => {
                    if (err) {
                        return res.status(422).json({success: false, message: err.message})
                    }
                    res.json({success: true, message: "Report Deleted Successfully"})
                });
            })

        });
    });
router.post('/:reportId/approve', (req, res, next) => {
    Report.findOne({_id: req.params.reportId}, (err, report) => {
        if (err) {
            return res.status(422).json({success: false, message: err.message})
        }
        report.approved = true;
        report.save((err) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            Video.update({_id: report.video}, {"$set": {violated: true,copyrights:report._id}}, (err) => {
                if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
                res.json({success: true, message: "Video marked as copyrights violated Successfully"})
            });
        });
    });
});
