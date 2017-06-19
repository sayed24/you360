const router = require('express').Router(),
	Video = require('mongoose').model('Video');


module.exports = function (app) {
    app.use('/api/search', router);
};
/**
 * @api {post} /api/search full text search in videos 
 * @apiName PostSearch
 * @apiGroup Search
 *
 * @apiError (422) RetrivingdataError Error while retriving data.
 *
 *  @apiSuccess {Object[]} docs List of matched videos.
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
router.route('/')
    .post((req, res, next) => {
        Video.find({$text: {$search: req.query.q}})
            .exec(function(err, docs) {
                if (err) {
                    res.status(422).json({
                        success: false,
                        message: err.message
                    });
                }
                res.json(docs);
            });
    })
