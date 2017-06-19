const router = require('express').Router(),
    passport = require('passport'),
    fs = require('fs'),
    helpers = require('../helpers'),
    config = require('../../config/config'),
    User = require('mongoose').model('User'),
    Video = require('mongoose').model('Video'),
    Report = require('mongoose').model('Report'),
    Category = require('mongoose').model('Category'),
    paginate = require('express-paginate'),
    multer = require('multer');

const requireAuth = passport.authenticate('jwt', {session: false});

router.use(paginate.middleware(10, 50));

module.exports = function (app) {
    app.use('/api/videos', router);
};


/**
 * @api {post} /api/videos/:videoId/stream Striming Video
 * @apiName PostStreamVideo
 * @apiGroup Video
 *
 *
 * @apiError (404) NotFoundError file not found.
 *
 * @apiSuccess (200) {Object} return Object is without name. 
 * 
 */

var upload_video = multer({
    dest: "public/uploads",
    rename: function (fieldname, filename) {
        return Math.round(Math.random() * 10000000) + "" + +new Date();
    }
}).single('video');
router.get('/:videoId/stream', (req, res, next) => {
    Video.findOne({_id:req.params.videoId},(err,video)=>{
        let  path = process.cwd() + `/public/uploads/${video.filename}`;
        if (fs.existsSync(path)) {
            let stat = fs.statSync(path);
            let total = stat.size;
            if (req.headers['range']) {
                let range = req.headers.range;
                let parts = range.replace(/bytes=/, "").split("-");
                let partialstart = parts[0];
                let partialend = parts[1];

                let start = parseInt(partialstart, 10);
                let end = partialend ? parseInt(partialend, 10) : total - 1;
                let chunksize = (end - start) + 1;
                console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

                let file = fs.createReadStream(path, {start: start, end: end});
                res.writeHead(206, {
                    'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': 'video/mp4'
                });
                file.pipe(res);
            } else {
                console.log('ALL: ' + total);
                res.writeHead(200, {'Content-Length': total, 'Content-Type': 'video/mp4'});
                fs.createReadStream(path).pipe(res);
            }
        }else{
            return res.status(404).json("file not found")
        }
    })

});


router.use(requireAuth);

/**
 * @api {post} /api/videos/upload upload a new Video
 * @apiName PostUploadVideo
 * @apiGroup Video
 *
 *
 * @apiError (400) UploadError any error durnig upload video.
 *
 * @apiSuccess {Object} return Object is without name. 
 * @apiSuccess {Object} return.filename uploaded video name.
 * 
 */

router.post('/upload', function (req, res, next) {
    upload_video(req, res, function (err) {
        if (err) {
            return res.status(400).json({error: err.message})
        } else {
            return res.json({filename: req.file.filename});
        }
    });
});

/**
 * @apiDefine CreateVideoError
 *
 * @apiError NoAccessRight Only authenticated.
 * @apiError (422) nameRequired Name is Required.
 * @apiError (422) descriptionRequired Descriptionis Required.
 * @apiError (422) categoryRequired Category is Required.
 */

/**
 * @apiDefine VideoSuccessReturn
 * @apiSuccess {Object} return Object is without name. 
 * @apiSuccess {Object} return.success success flag of success data insertion.
 * @apiSuccess {String} return.message success message.
 */


/*
* CRUD operations
*/
router.route('/')
//Retrive all videos
    /**
     * @api {get} /api/videos Request videos information
     * @apiName GetVideos
     * @apiGroup Video
     *
     * @apiError (404) RetrivingVideoError Error while retriving data.
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
    .get((req, res, next) => {
        Video.paginate({}, {
            populate: ["category", "owner", "comments.owner","copyrights"],
            lean: true,
            page: req.query.page,
            limit: req.query.limit,
            sort: req.query.sort,
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
                video.stream = helpers.fullUrl(req, '/api/videos/' + video._id + '/stream')
                video.thumb = helpers.defaulter(video.thumb,helpers.fullUrl(req, '/uploads/' + video.thumb),"");
                // get if user liked this video or not
                video.liked = helpers.isuserinarray(video.likes,req.user._id)
                video.disliked = helpers.isuserinarray(video.dislikes,req.user._id)
                return video;
            })
            videos.docs = docs;
            res.json(videos);
        })
    })
    /**
     * @api {post} /api/videos Create a new Video
     * @apiName PostVideo
     * @apiGroup Video
     *
     * @apiuse CreateVideoError
     *
     * @apiuse VideoSuccessReturn
     */
    //Create New video  
    .post((req, res, next) => {
        req.checkBody({
            notEmpty: true,
            'name': {
                notEmpty: true,
                errorMessage: 'Name is Required'
            },
            'description': {
                notEmpty: true,
                errorMessage: 'Description is Required'
            },
            'category': {
                notEmpty: true,
                errorMessage: 'category is Required'
            },
        });
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                res.status(422).json(result.useFirstErrorOnly().mapped());
                return;
            }
            let video = req.body;
            //if there is a thumb save it
            if (video.thumb) {
                video.thumb = helpers.saveFile(video.thumb)
            }
            video.views = 0
            video.owner = req.user._id
            //video.copyRightOwner = []
            if (!video.hasOwnProperty('tags')) {
                video.tags = []
            }
            Video.create(video, (err, video) => {
                if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
                res.json({success: true, message: "video Added Successfully", id: video._id})
            });
        });
    });

router.route('/:videoId')
    
////Retrive video data
    /**
     * @api {get} /api/videos/videoId Request video information
     * @apiName GetVideo
     * @apiGroup Video
     *
     * @apiParam {String} videoId The Video-ID.
     *
     * @apiError (404) RetrivingVideoError Error while retriving data.
     * @apiError (404) VideoNotfound Error Video Not found.
     *
     * @apiSuccess {Object}  docs Video information
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
    .get((req, res, next) => {
        let query = Video.findOne({_id: req.params.videoId}).populate("owner category comments.owner copyrights");
        query.lean().exec((err, video) => {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: err.message
                });
            }
            if (!video) {
                return res.status(404).json({success: false, message: "Video Not found"})
            }
            // get if user liked this video or not
            video.liked = helpers.isuserinarray(video.likes,req.user._id)
            video.disliked = helpers.isuserinarray(video.dislikes,req.user._id)

            video.likes = video.likes.length;
            video.dislikes = video.dislikes.length;
            video.path = helpers.fullUrl(req, '/uploads/' + video.filename);
            video.stream = helpers.fullUrl(req, '/api/videos/' + video._id + '/stream')
            video.thumb = helpers.defaulter(video.thumb,helpers.fullUrl(req, '/uploads/' + video.thumb),"");
            res.json(video);
        });
    })

    //Delete video 
    /**
     * @api {delete} /api/videos/:videoId Delete video.
     * @apiName DeleteVideo
     * @apiGroup Video
     *
     * @apiParam {String} videoId The Video-ID.
     * 
     * 
     * @apiError (404) VideoNotFound   The <code>VideoId</code> of the Video was not found.
     *
     * @apiuse VideoSuccessReturn
     */
    .delete((req, res, next) => {
        Video.findOne({_id: req.params.videoId}, (err, video) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            if (!video) {
                return res.status(404).json({success: false, message: "Video Not found"})
            }
            video.remove((err) => {
                if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
                res.json({success: true, message: "Video Deleted Successfully"})
            });
        })

    })
    /**
     * @api {put} /api/videos/:videoId Change Video date.
     * @apiName PutVideo
     * @apiGroup Video
     *
     * @apiParam {String} videoId The Video-ID.
     * 
     * @apiError ModifingVidepError Error while retriving data.
     * @apiError VideoNotFound   The <code>videoId</code> of the Video was not found.
     *
     * @apiuse VideoSuccessReturn
     */
    //Update video info
    .put((req, res, next) => {
        //update name,description,cat,tag
        let videoinfo = req.body;
        Video.update({_id: req.params.videoId}, {"$set": videoinfo}, (err) => {
            if (err) {
                return res.status(422).json({success: false, message: err})
            }
            res.json({success: true, message: "Video Updated Successfully"})
        });
    });

//Comment CRUD
/**
 * @api {post} /api/videos/:videoId/comments Create a new comment
 * @apiName PostComment
 * @apiGroup Video Comments
 *
 * @apiError (422) RetrivingVideoError Error while retriving data.
 * @apiError (404) VideoNotfound Error Video Not found.
 * @apiError (422) commentRequired Comment is Required.
 *
 * @apiuse VideoSuccessReturn
 */
router.post('/:videoId/comments', (req, res, next) => {
    let commentinfo = req.body;
    req.checkBody({
        notEmpty: true,
        'comment': {
            notEmpty: true,
            errorMessage: 'Comment is Required'
        }
    })
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            res.status(422).json(result.useFirstErrorOnly().mapped());
            return;
        }
        commentinfo.owner = req.user._id
        Video.update({_id: req.params.videoId}, {"$push": {"comments": commentinfo}}, (err) => {
            if (err) {
                return res.status(422).json({success: false, message: err})
            }
            res.json({success: true, message: "Comment Added and video updated Successfully"})
        });
    });
});

/**
 * @api {delete} /api/videos/:videoId/comments/:commentId Delete comment.
 * @apiName DeleteComment
 * @apiGroup Video Comments
 *
 * @apiParam {String} videoId The Video-ID.
 * @apiParam {String} commentId The Comment-ID.
 * 
 * @apiError (404) VideoNotFound   The <code>VideoId</code> of the Video was not found.
 * @apiError (422) RetrivingdataError Error while retriving data.
 *
 * @apiuse VideoSuccessReturn
 */ 
router.route('/:videoId/comments/:commentId')
    .delete((req, res, next) => {
        Video.findOne({_id: req.params.videoId}, (err, video) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            if (!video) {
                return res.status(404).json({success: false, message: "video Not found"})
            }

            let comments = video.comments

            console.log(comments)
            //delete comment from list of comments
            for (var i = 0; i <= comments.length - 1; i++) {
                if (comments[i]._id == req.params.commentId) {
                    comments.splice(i, 1)
                    break
                }
            }
            Video.update({_id: req.params.videoId}, {"$set": {comments: comments}}, (err) => {
                if (err) {
                    return res.status(422).json({success: false, message: err})
                }
                res.json({success: true, message: "Comment deleted and Video Updated Successfully"})
            });
        })
    })
    /**
     * @api {put} /api/videos/:videoId/comments/:commentId Edit comment.
     * @apiName PutComment
     * @apiGroup Video Comments
     *
     * @apiParam {String} videoId The Video-ID.
     * @apiParam {String} commentId The Comment-ID.
     * 
     * @apiError (404) VideoNotFound   The <code>VideoId</code> of the Video was not found.
     * @apiError (422) RetrivingdataError Error while retriving data.
     * @apiError (422) commentRequired Comment is Required.
     *
     * @apiuse VideoSuccessReturn
     */ 
    .put((req, res, next) => {
        let commentdata = req.body;
        req.checkBody({
            notEmpty: true,
            'comment': {
                notEmpty: true,
                errorMessage: 'Comment is Required'
            }
        })
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                res.status(422).json(result.useFirstErrorOnly().mapped());
                return;
            }

            Video.findOne({_id: req.params.videoId}, (err, video) => {
                if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
                if (!video) {
                    return res.status(404).json({success: false, message: "video Not found"})
                }
                // req.body = {comment:"updated data"}
                let commentdata = req.body;
                let comments = video.comments
                for (var i = 0; i <= comments.length - 1; i++) {
                    if (comments[i]._id == req.params.commentId) {
                        comments[i].comment = commentdata.comment
                        break
                    }
                }

                Video.update({_id: req.params.videoId}, {"$set": {comments: comments}}, (err) => {
                    if (err) {
                        return res.status(422).json({success: false, message: err})
                    }
                    res.json({success: true, message: "Comment updated and Video Updated Successfully"})
                });
            });
        });
    });

/**
 * @api {post} /api/videos/:videoId/like like video
 * @apiName PostLike
 * @apiGroup Video
 *
 * @apiError (422) RetrivingVideoError Error while retriving data.
 * @apiError (404) VideoNotfound Error Video Not found.
 *
 * @apiuse VideoSuccessReturn
 */
//video likes api
router.post('/:videoId/like', (req, res, next) => {

    Video.findOne({_id: req.params.videoId}, (err, video) => {
        if (err) {
            return res.status(422).json({success: false, message: err.message})
        }
        if (!video) {
            return res.status(404).json({success: false, message: "video Not found"})
        }
        let uid = req.user._id
        //Remove user id from dislikes array
        video.likes.addToSet(uid);
        video.dislikes.pull(uid);
        video.save((err) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            return res.json({success: true, message: "you liked the video Successfully"})
        })
    });
});

/**
 * @api {post} /api/videos/:videoId/dislike dislike video
 * @apiName PostdisLike
 * @apiGroup Video
 *
 * @apiError (422) RetrivingVideoError Error while retriving data.
 * @apiError (404) VideoNotfound Error Video Not found.
 *
 * @apiuse VideoSuccessReturn
 */

//video dislikes api
router.post('/:videoId/dislike', (req, res, next) => {
    Video.findOne({_id: req.params.videoId}, (err, video) => {
        if (err) {
            return res.status(422).json({success: false, message: err.message})
        }
        if (!video) {
            return res.status(404).json({success: false, message: "video Not found"})
        }
        let uid = req.user._id
        //Remove user id from likes array
        video.dislikes.addToSet(uid);
        video.likes.pull(uid);
        video.save((err) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            return res.json({success: true, message: "you disliked the video Successfully"})
        });
    });
});

/**
 * @api {post} /api/videos/:videoId/video add views video record. 
 * @apiName PostViews
 * @apiGroup Video
 *
 * @apiError (422) RetrivingVideoError Error while retriving data.
 * @apiError (404) VideoNotfound Error Video Not found.
 *
 * @apiuse VideoSuccessReturn
 */
//video views api
router.post('/:videoId/view', (req, res, next) => {
    Video.findOne({_id: req.params.videoId}, (err, video) => {
        if (err) {
            return res.status(422).json({success: false, message: err.message})
        }
        if (!video) {
            return res.status(404).json({success: false, message: "video Not found"})
        }
        Video.update({_id: req.params.videoId}, {"$inc": {views: 1}}, (err) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            res.json({success: true, message: "view added Successfully"})
        })
    });
});

/**
 * @api {get} /api/videos/:videoId/similar Retrive similar videos. 
 * @apiName PostsimilarVideos
 * @apiGroup Video
 *
 * @apiError (422) RetrivingVideoError Error while retriving data.
 * @apiError (404) VideoNotfound Error Video Not found.
 *
 * @apiSuccess {Object[]}  docs Video information
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

router.get('/:videoId/similar', (req, res, next) => {
    Video.findOne({_id: req.params.videoId}, (err, video) => {
        if (err) {
            return res.status(422).json({success: false, message: err.message})
        }
        if (!video) {
            return res.status(404).json({success: false, message: "video Not found"})
        }
        let vtags = video.tags;
        Video.paginate({_id: {$ne: req.params.videoId},tags: {$in:vtags}}, {
            populate: ["category", "owner", "comments.owner"],
            lean: true,
            page: req.query.page,
            limit: req.query.limit,
            sort: req.query.sort,
        }, (err, videos) => {
            if (err) {
                res.status(422).json({
                    success: false,
                    message: err.message
                });
            }
            let docs = videos.docs;
            docs = docs.map((video) => {
                video.path = helpers.fullUrl(req, '/uploads/' + video.filename);
                video.stream = helpers.fullUrl(req, '/api/videos/' + video._id + '/stream')
                video.thumb = helpers.defaulter(video.thumb,helpers.fullUrl(req, '/uploads/' + video.thumb),"");
                // get if user liked this video or not
                video.liked = helpers.isuserinarray(video.likes,req.user._id)
                video.disliked = helpers.isuserinarray(video.dislikes,req.user._id)
                return video;
            })
            videos.docs = docs;
            res.json(videos);
        })
    })
})