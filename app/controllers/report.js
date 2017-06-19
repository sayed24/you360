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
/**
 * @apiDefine CreatereportError
 *
 * @apiError NoAccessRight Only authenticated.
 * @apiError (422) videoRequired video is Required.
 * @apiError (422) emailRequired email is Required.
 * @apiError (422) nameRequired Name is Required.
 * @apiError (422) descriptionRequired description is Required.
 */

/**
 * @apiDefine ReportSuccessReturn
 * @apiSuccess {Object} return Object is without name. 
 * @apiSuccess {Object} return.success success flag of success data insertion.
 * @apiSuccess {String} return.message success message.
 */
router.route('/')
    /**
     * @api {get} /api/reports Retrive Reports data
      * @apiName Getreports
     * @apiGroup Report
     *
     * @apiError (422) RetrivingCategoryError Error while retriving data.
     *
     * @apiSuccess {Object} reports list of reports.
     */
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
    /**
     * @api {post} /api/reports Create a new Report
     * @apiName Postreport
     * @apiGroup Report
     *
     * @apiuse CreatereportError
     *
     * @apiuse ReportSuccessReturn
     */
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
    /**
     * @api {get} /api/reports/:reportId Request Report information
     * @apiName GetReport
     * @apiGroup Report
     *
     * @apiParam {String} reportId The Report-ID.
     *
     * @apiError (422) RetrivingdataError Error while retriving data.
     * @apiError (404) ReportNotfound Error The <code>reportId</code> of the Report was not found.
     *
     * @apiSuccess {Object} report report object.
     */
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
/**
 * @api {post} /api/reports/:reportId/approve Request Report information
 * @apiName PostApprove
 * @apiGroup Report
 *
 * @apiParam {String} reportId The Report-ID.
 *
 * @apiError (422) RetrivingdataError Error while retriving data.
 * @apiError (404) ReportNotfound Error The <code>reportId</code> of the Report was not found.
 *
 * @apiSuccess {Object} return Object is without name. 
 * @apiSuccess {Object} return.success success flag of success data insertion.
 * @apiSuccess {String} return.message success message.
 */
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
