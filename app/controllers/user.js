const router = require('express').Router(),
    passport = require('passport'),
    fs = require('fs'),
    helpers = require('../helpers'),
    config = require('../../config/config'),
    User = require('mongoose').model('User');
const requireAuth = passport.authenticate('jwt', {session: false});
/*
* pagination
*/
const mongoosePaginate = require('mongoose-paginate');
const paginate = require('express-paginate')

router.use(paginate.middleware(10, 50));


module.exports = function (app) {

    app.use('/api/users', router);
    
};
router.use(requireAuth);

//= =======================================
// User Routes
//= =======================================
router.route('/')
    .get((req, res, next) => {
        User.paginate({}, { page: req.query.page, limit: req.query.limit }, function(err, users) {
            if (err) {
                res.status(422).json({
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
                res.status(422).json(result.useFirstErrorOnly().mapped());
                return;
            }
            let user = req.body;
            if (user.image) {
                user.image = helpers.saveFile(user.image);
            }
            User.create(user, (err, user) => {
                if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
                res.json({success: true, message: "User Added Successfully"})
            });
        });
    });


router.route('/:userId')
    .get((req, res, next) => {
        let query = User.findOne({_id: req.params.userId});
        query.exec((err, user) => {
            if (err) {
                return res.status(422).json({
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
                return res.status(422).json({success: false, message: err})
            }
            res.json({success: true, message: "User Updated Successfully"})
        });
    })
    .delete((req, res, next) => {
        User.findOne({_id: req.params.userId}, (err, user) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            if(!user){
                return res.status(404).json({success: false, message: "User Not found"})
            }
            if (user.image) {
                helpers.removeFile(user.image);
            }
            user.remove((err) => {
                if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
                res.json({success: true, message: "User Deleted Successfully"})
            });
        })
    });
router.get('/:userId/notifications', (req, res, next) => {
    User.findOne({_id: req.params.userId}).populate({
        path: 'notifications',
        options: {sort: '-createdAt'}
    }).exec((err, user) => {
        if (err) {
            return res.status(422).json({success: false, message: err})
        }
        if(!user){
            return res.status(404).json({success: false, message: "User Not found"})
        }
        let notification=user.notifications.filter(notification=>notification.seen==false);
        res.json(notification);
    })
});
