const router = require('express').Router(),
    passport = require('passport'),
    fs = require('fs'),
    helpers = require('../helpers'),
    config = require('../../config/config'),
    User = require('mongoose').model('User');
const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function (app) {

    app.use('/api/users', router);
};
router.use(requireAuth);

//= =======================================
// User Routes
//= =======================================
router.route('/')
    .get((req, res, next) => {
        User.find({}).sort('-createdAt').exec((err, users) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            res.json(users);
        });
    })
    .post((req, res, next) => {
        req.checkBody({
            notEmpty: true,
            'email': {
                isEmail: {
                    errorMessage: 'Invalid Email'
                },
                errorMessage: 'Email is Required'
            },
            'password': {
                notEmpty: true,
                isLength: {
                    options: [{min: 8, max: 20}],
                    errorMessage: 'Must be between 8 and 20 chars long'
                },
                errorMessage: 'Password is Required'
            },
            'firstName': {
                notEmpty: true,
                errorMessage: 'First Name is Required'
            },
            'lastName': {
                notEmpty: true,
                errorMessage: 'Last Name is Required'
            }
        });
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                res.status(400).json(result.useFirstErrorOnly().mapped());
                return;
            }
            let user = req.body;
            if (user.image) {
                user.image = helpers.saveFile(user.image);
            }
            User.create(user, (err, user) => {
                if (err) {
                    return res.status(400).json({success: false, message: err.message})
                }
                Activity.create({
                    owner: req.user._id,
                    link: config.domain + "/users/" + user._id,
                    message: req.user.firstName + " Added new User"
                }, (err) => {
                    if (err) {
                        return res.status(400).json({success: false, message: err.message})
                    }
                });
                res.json({success: true, message: "User Added Successfully"})
            });
        });
    });


router.route('/:userId')
    .get((req, res, next) => {
        let query = User.findOne({_id: req.params.userId});
        if (req.query !== {}) {
            let qps = req.query;
            for (let q in qps) {
                if (q === 'fields') {
                    if (qps.fields !== 'all') {
                        let fields = qps.fields.split(',')
                        query = query.select(fields);
                    }
                }

                if (q === 'with') {
                    switch (qps.with) {
                        case 'friends':
                            query = query.populate('friends');
                            break;
                        case 'groups':
                            query = query.populate('groups');
                            break;
                        case 'owned_groups':
                            query = query.populate('owned_groups');
                            break;
                        case 'orders':
                            query = query.populate('orders');
                            break;
                        case 'notifications':
                            query = query.populate('notifications');
                            break;
                        case 'activities':
                            query = query.populate('activities');
                            break;
                        case 'all':
                            query = query.populate('notifications orders groups friends owned_groups activities');
                            break;
                    }
                }
            }
        }
        query.exec((err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            if(!user){
                return res.status(404).json({success: false, message: "User Not found"})
            }
            res.json(user);
        });

    })
    .put((req, res, next) => {
        let userdata = req.body;
        if (userdata.image) {
            userdata.image = helpers.saveFile(userdata.image);
        }
        User.update({_id: req.params.userId}, {"$set": userdata}, (err) => {
            if (err) {
                return res.status(500).json({success: false, message: err})
            }
            Activity.create({
                owner: req.user._id,
                link: config.domain + "/users/" + req.user._id,
                message: req.user.firstName + " Updated his Info"
            }, (err) => {
                if (err) {
                    return res.status(400).json({success: false, message: err.message})
                }
            })
            res.json({success: true, message: "User Updated Successfully"})
        });
    })
    .delete((req, res, next) => {
        User.findOne({_id: req.params.userId}, (err, user) => {
            if (err) {
                return res.status(500).json({success: false, message: err})
            }
            if(!user){
                return res.status(404).json({success: false, message: "User Not found"})
            }
            if (user.image) {
                helpers.removeFile(user.image);
            }
            user.remove((err) => {
                if (err) {
                    console.log(err.message);
                }
            });
            res.json({success: true, message: "User Deleted Successfully"})
        })
    });

router.get('/:userId/friends', (req, res, next) => {
    User.findOne({_id: req.params.userId}).populate({
        path: 'friends',
        select: 'firstName lastName image email role',
        options: {sort: '-createdAt'}
    }).exec((err, user) => {
        if (err) {
            return res.status(500).json({success: false, message: err})
        }
        if(!user){
            return res.status(404).json({success: false, message: "User Not found"})
        }
        res.json(user.friends);
    })
});
router.get('/:userId/activities', (req, res, next) => {
    User.findOne({_id: req.params.userId}).populate({
        path: 'activities',
        options: {sort: '-createdAt'}
    }).exec((err, user) => {
        if (err) {
            return res.status(500).json({success: false, message: err})
        }
        if(!user){
            return res.status(404).json({success: false, message: "User Not found"})
        }
        res.json(user.activities);
    })
});

router.get('/:userId/messages', (req, res, next) => {

});
router.get('/:userId/notifications', (req, res, next) => {
    User.findOne({_id: req.params.userId}).populate({
        path: 'notifications',
        options: {sort: '-createdAt'}
    }).exec((err, user) => {
        if (err) {
            return res.status(500).json({success: false, message: err})
        }
        if(!user){
            return res.status(404).json({success: false, message: "User Not found"})
        }
        let notification=user.notifications.filter(notification=>notification.seen==false);
        res.json(notification);
    })
});
