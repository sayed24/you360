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
/**
 * @apiDefine CreateCategoryError
 *
 * @apiError NoAccessRight Only authenticated.
 * @apiError (422) nameRequired Name is Required.
 */

/**
 * @apiDefine CategorySuccessReturn
 * @apiSuccess {Object} return Object is without name. 
 * @apiSuccess {Object} return.success success flag of success data insertion.
 * @apiSuccess {String} return.message success message.
 */
router.route('/')
	//retrive all categories
    /**
     * @api {get} /api/categories Request videos information
     * @apiName Getcategories
     * @apiGroup Category
     *
     * @apiError (422) RetrivingCategoryError Error while retriving data.
     *
     * @apiSuccess {Object[]} docs List of all categories.
     * @apiSuccess {String} docs.name category name.
     * @apiSuccess {String} docs.description category Description.
     */
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
    /**
     * @api {post} /api/categories Create a new Category
     * @apiName Postcategories
     * @apiGroup Category
     *
     * @apiuse CreateCategoryError
     *
     * @apiuse CategorySuccessReturn
     */
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
    /**
     * @api {get} /api/categories/categoryId Request Category information
     * @apiName GetCategory
     * @apiGroup Category
     *
     * @apiParam {String} categoryId The Category-ID.
     *
     * @apiError (422) RetrivingCategoryError Error while retriving data.
     * @apiError (404) CategoryNotfound Error The <code>categoryId</code>  of the Category was not found.
     *
     * @apiSuccess {Object} docs List of all categories.
     * @apiSuccess {String} docs.name category name.
     * @apiSuccess {String} docs.description category Description.
     */
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
    /**
     * @api {delete} /api/categories/categoryId Delete Category.
     * @apiName DeleteCategory
     * @apiGroup Category
     *
     * @apiParam {String} categoryId The Category-ID.
     * 
     * @apiError (422) ModifingCategoryError Error while retriving data.
     * @apiError (404) CategoryNotfound Error The <code>categoryId</code>  of the Category was not found.
     *
     * @apiuse CategorySuccessReturn
     */
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
    /**
     * @api {put} /api/categories/categoryId Delete Category.
     * @apiName PutCategory
     * @apiGroup Category
     *
     * @apiParam {String} categoryId The Category-ID.
     * 
     * @apiError (422) ModifingCategoryError Error while retriving data.
     * @apiError (404) CategoryNotfound Error The <code>categoryId</code>  of the Category was not found.
     *
     * @apiuse CategorySuccessReturn
     */
    .put((req, res, next) =>{
        let catinfo = req.body;
        Category.update({_id: req.params.categoryId}, {"$set": catinfo}, (err) => {
            if (err) {
                return res.status(422).json({success: false, message: err})
            }
            res.json({success: true, message: "Category Updated Successfully"})
        });
    });
/**
 * @api {get} /api/:categoryId/videos Request videos related to certain category information
 * @apiName GetCategoryVideos
 * @apiGroup Category
 *
 * @apiError (422) RetrivingVideoError Error while retriving data.
 *
 * @apiSuccess {Object[]} docs List of videos.
 * @apiSuccess {String} docs.name Video name.
 * @apiSuccess {String} docs.description Video Description.
 * @apiSuccess {String} docs.category Video category id.
 * @apiSuccess {String} docs.filename Video filename.
 * @apiSuccess {Number} docs.views Number of view video.
 * @apiSuccess {String} docs.owner Video owner id.
 * @apiSuccess {String[]} docs.tags Tags name array.
 * @apiSuccess {Object[]} docs.comments Video comments
 * @apiSuccess {String} docs.comments.comment Comment body.
 * @apiSuccess {String} docs.comments.owner Comment owner.
 * @apiSuccess {String[]} docs.dislikes Array of dislike <code>usersId</code> 
 * @apiSuccess {String[]} docs.likes Array of likes <code>usersId</code> 
 * @apiSuccess {String} docs.path Video path
 * @apiSuccess {String} docs.stream Video stream
 * @apiSuccess {String} docs.thumb Video thumb
 * @apiSuccess {Boolean} docs.liked flag for loggin user liked video 
 * @apiSuccess {Boolean} docs.disliked flag for loggin user disliked video

     */
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
