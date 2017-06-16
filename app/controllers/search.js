const router = require('express').Router(),
	Video = require('mongoose').model('Video');


module.exports = function (app) {
    app.use('/api/search', router);
};

router.route('/')
    .get((req, res, next) => {
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
