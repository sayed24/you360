const router = require('express').Router(),
	passport = require('passport'),
    helpers = require('../helpers'),
	Video = require('mongoose').model('Video'),
    paginate = require('express-paginate');
const requireAuth = passport.authenticate('jwt', {session: false});

router.use(paginate.middleware(10, 50));

module.exports = function (app) {
    app.use('/api/tags', router);
};

router.use(requireAuth);
/**
 * @api {get} /api/tags Request all tags
 * @apiName GetTags
 * @apiGroup Tag
 *
 * @apiError (422) RetrivingTagError Error while retriving data.
 *
 * @apiSuccess {String[]} list of tags.
 */
router.route('/')
    .get((req, res, next) => {
        Video.find({}, {tags: 1, _id: 0}, function (err, tags) {
            if (err) {
                res.status(422).json({
                    success: false,
                    message: err.message
                });
            }
            let tagarr = []
            for (tag in tags) {
                tagarr = tagarr.concat(tags[tag].tags)
            }
            tagarr = helpers.mergeArrayUnique(tagarr)
            res.json(tagarr);
        });
    })
