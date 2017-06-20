const router = require('express').Router(),
    passport = require('passport'),
    fs = require('fs'),
    helpers = require('../helpers'),
    bcrypt = require('bcrypt-nodejs'),
    config = require('../../config/config'),
    User = require('mongoose').model('User'),
    Video = require('mongoose').model('Video');
const requireAuth = passport.authenticate('jwt', {session: false});
/*
* pagination
*/
const paginate = require('express-paginate')

router.use(paginate.middleware(10, 50));


module.exports = function (app) {

    app.use('/api/users', router);

};
router.use(requireAuth);

//= =======================================
// User Routes
//= =======================================

/**
 * @apiDefine CreateUserError
 *
 * @apiError NoAccessRight Only authenticated.
 * @apiError PaswordError Minimum of 8 characters and Maximum 20 characters required.
 * @apiError InvalidEmail Invalid Email.
 * @apiError firstnameRequired First Name is Required.
 * @apiError lastnameRequired First Name is Required.
 */

/**
 * @apiDefine UserSuccessReturn
 * @apiSuccess {String} success flag of success data insertion.
 * @apiSuccess {String} message success message.
 */

router.route('/')
    /**
     * @api {get} /users Request Users information
     * @apiName GetUsers
     * @apiGroup User
     *
     * @apiError RetrivingUserError Error while retriving data.
     *
     * @apiSuccess {Array} users Array of user information.
     */
    .get((req, res, next) => {
        User.paginate({}, {page: req.query.page, limit: req.query.limit}, function (err, users) {
            if (err) {
                res.status(422).json({
                    success: false,
                    message: err.message
                });
            }
            res.json(users);
        });

    })
    /**
     * @api {post} /users Create a new User
     * @apiName PostUser
     * @apiGroup User
     *
     * @apiuse CreateUserError
     *
     * @apiuse UserSuccessReturn
     */
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
    /**
     * @api {get} /users/:userId Read data of a User
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {String} userId The Users-ID.
     * 
     * @apiError RetrivingUserError Error while retriving data.
     * @apiError UserNotFound   The <code>userId</code> of the User was not found.
     *
     * @apiSuccess {Object}   user     The User information.
     */
    .get((req, res, next) => {
        let query = User.findOne({_id: req.params.userId});
        query.exec((err, user) => {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: err.message
                });
            }
            if (!user) {
                return res.status(404).json({success: false, message: "User Not found"})
            }
            res.json(user);
        });

    })
    /**
     * @api {put} /users/:userId Change User date.
     * @apiName PutUser
     * @apiGroup User
     *
     * @apiParam {String} userId The Users-ID.
     * 
     * @apiError ModifingUserError Error while retriving data.
     * @apiError UserNotFound   The <code>userId</code> of the User was not found.
     *
     * @apiuse UserSuccessReturn
     */
    .put((req, res, next) => {
        let userdata = req.body;

        if (userdata.image && userdata.image.startsWith("data:")) {
            userdata.image = helpers.saveFile(userdata.image);
        }
        let salt = bcrypt.genSaltSync(5);
        userdata.password = bcrypt.hashSync(userdata.password, salt, null,);
        console.log(userdata.password);
        User.update({_id: req.params.userId}, {"$set": userdata}, (err) => {
            if (err) {
                return res.status(422).json({success: false, message: err})
            }
            res.json({success: true, message: "User Updated Successfully"})
        });
    })
    /**
     * @api {delete} /users/:userId Delete User.
     * @apiName DeleteUser
     * @apiGroup User
     *
     * @apiParam {String} userId The Users-ID.
     * 
     * 
     * @apiError UserNotFound   The <code>userId</code> of the User was not found.
     *
     * @apiuse UserSuccessReturn
     */
    .delete((req, res, next) => {
        User.findOne({_id: req.params.userId}, (err, user) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            if (!user) {
                return res.status(404).json({success: false, message: "User Not found"})
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
        if (!user) {
            return res.status(404).json({success: false, message: "User Not found"})
        }
        let notification = user.notifications.filter(notification => notification.seen == false);
        res.json(notification);
    })
});
/**
 * @api {get} /user/:userId/videos Request User videos information
 * @apiName GetUserVideos
 * @apiGroup User
 *
 * @apiError RetrivingVideosError Error while retriving data.
 *
 * @apiParam {Number} userId Users unique ID.
 *
 * @apiSuccess {Array} videos Array of user Videos
 */

router.get('/:userId/videos', (req, res, next) => {
    Video.paginate({owner: req.params.userId}, {
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
