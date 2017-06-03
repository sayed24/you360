const router = require('express').Router(),
	passport = require('passport'),
	Tag = require('mongoose').model('Tag'),
	//pagination
    mongoosePaginate = require('mongoose-paginate'),
    paginate = require('express-paginate');
const requireAuth = passport.authenticate('jwt', {session: false});

router.use(paginate.middleware(10, 50));


module.exports = function (app) {
    app.use('/api/tags', router);
};

router.use(requireAuth);

router.route('/')
	//retrive all tags
	.get((req, res, next) => {
        Tag.paginate({}, { page: req.query.page, limit: req.query.limit }, function(err, tags) {
            if (err) {
                res.status(422).json({
                    success: false,
                    message: err.message
                });
            }
            res.json(tags);
           });
        //})

    })
    .post((req, res, next) => {
        req.checkBody({
            notEmpty: true,
            'name': {
                notEmpty: true,
                errorMessage: 'Name is Required'
            },
        });
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                res.status(422).json(result.useFirstErrorOnly().mapped());
                return;
            }
            let tag = req.body;
            Tag.create(tag, (err, tag) => {
                if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
                res.json({success: true, message: "tag Added Successfully"})
            });
        });

    });
router.route('/:tagId')

    ////Retrive tag data
    .get((req, res, next) => {
        let query = Tag.findOne({_id: req.params.tagId});
        query.exec((err, tag) => {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: err.message
                });
            }
            if(!tag){
                return res.status(404).json({success: false, message: "Tag Not found"})
            }
            res.json(tag);
        });
    })

    //Delete tag 
    .delete((req, res, next) => {
        Tag.findOne({_id: req.params.tagId}, (err, tag) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            if(!tag){
                return res.status(404).json({success: false, message: "Tag Not found"})
            }
            tag.remove((err) => {
            	if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
                res.json({success: true, message: "Tag Deleted Successfully"})
            });
        })

    })
    //Update tag info
    .put((req, res, next) =>{
        //update name,description,cat,tag
        let taginfo = req.body;
        Tag.update({_id: req.params.tagId}, {"$set": taginfo}, (err) => {
            if (err) {
                return res.status(422).json({success: false, message: err})
            }
            res.json({success: true, message: "Tag Updated Successfully"})
        });
    });
