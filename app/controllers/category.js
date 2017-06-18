const router = require('express').Router(),
	passport = require('passport'),
    helpers = require('../helpers'),
    config = require('../../config/config'),
	Category = require('mongoose').model('Category'),
    Video = require('mongoose').model('Video');
	//pagination
    mongoosePaginate = require('mongoose-paginate'),
    paginate = require('express-paginate');
const requireAuth = passport.authenticate('jwt', {session: false});

router.use(paginate.middleware(10, 50));


module.exports = function (app) {
    app.use('/api/categories', router);
};

router.use(requireAuth);

router.route('/')
	//retrive all categories
	.get((req, res, next) => {
        Category.paginate({}, { page: req.query.page, limit: req.query.limit }, function(err, categories) {
            if (err) {
                res.status(422).json({
                    success: false,
                    message: err.message
                });
            }
            res.json(categories);
           });

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
            let category = req.body;
            Category.create(category, (err, category) => {
                if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
                res.json({success: true, message: "Category Added Successfully"})
            });
        });

    });
router.route('/:categoryId')

    ////Retrive category data
    .get((req, res, next) => {
        let query = Category.findOne({_id: req.params.categoryId});
        query.exec((err, category) => {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: err.message
                });
            }
            if(!category){
                return res.status(404).json({success: false, message: "Category Not found"})
            }
            res.json(category);
        });
    })

    //Delete category 
    .delete((req, res, next) => {
        Category.findOne({_id: req.params.categoryId}, (err, category) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            if(!category){
                return res.status(404).json({success: false, message: "Category Not found"})
            }
            category.remove((err) => {
            	if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
                res.json({success: true, message: "Category Deleted Successfully"})
            });
        })

    })
    //Update category info
    .put((req, res, next) =>{
        let catinfo = req.body;
        Category.update({_id: req.params.categoryId}, {"$set": catinfo}, (err) => {
            if (err) {
                return res.status(422).json({success: false, message: err})
            }
            res.json({success: true, message: "Category Updated Successfully"})
        });
    });

router.get('/:categoryId/videos', (req, res, next) => {
    Video.paginate({category: req.params.categoryId}, {
        page: req.query.page,
        limit: req.query.limit,
        populate: "owner category"
    }, function (err, videos) {
        if (err) {
            res.status(422).json({
                success: false,
                message: err.message
            });
        }
        let docs = videos.docs;
        docs = docs.map((video) => {
            video.path = helpers.fullUrl(req, '/uploads/' + video.filename);
            video.thumb = helpers.defaulter(video.thumb,helpers.fullUrl(req, '/uploads/' + video.thumb),"");
            return video;
        })
        videos.docs = docs;
        res.json(videos);
    });
})
