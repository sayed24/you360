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



var upload_video = multer({
    dest: "public/uploads",
    rename: function (fieldname, filename) {
        return Math.round(Math.random() * 10000000) + "" + +new Date();
    }
}).single('video');
router.get('/:videoId/stream', (req, res, next) => {
    Video.findOne({_id:req.params.videoId},(err,video)=>{
        let path = ''
        if(video.filename){
            path = process.cwd() + `/public/uploads/${video.filename}`;
        }else{
            return res.status(404).json("file not found")
        }
        console.log(path);
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
    })

});


router.use(requireAuth);


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
 * @apiError nameRequired Name is Required.
 * @apiError descriptionRequired Descriptionis Required.
 * @apiError categoryRequired Category is Required.
 */

/*
* CRUD operations
*/
router.route('/')
//Retrive all videos
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

//TODO Add check if video is violated -yes-> return copy right owner data
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
                // violated video
                if(video.violated){
                    for(let i=0;i<video.copyRightOwner.length;i++){ 
                        if(video.copyRightOwner[i].lastOwnerReported){
                            video.copyRightOwner = video.copyRightOwner[i]
                        }
                    }
                }
                return video;
            })
            videos.docs = docs;
            res.json(videos);
        })
    })
})