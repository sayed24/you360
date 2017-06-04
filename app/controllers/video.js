const router = require('express').Router(),
    passport = require('passport'),
    uuid = require('uuid'),
    fs = require('fs'),
    helpers = require('../helpers'),
    config = require('../../config/config'),
    User = require('mongoose').model('User'),
    Video = require('mongoose').model('Video'),
    Category =  require('mongoose').model('Category'),
    Tag = require('mongoose').model('Tag'),
    //pagination
    mongoosePaginate = require('mongoose-paginate'),
    paginate = require('express-paginate');

const requireAuth = passport.authenticate('jwt', {session: false});

router.use(paginate.middleware(10, 50));

module.exports = function (app) {
    app.use('/api/videos', router);
};
router.use(requireAuth);


router.route('/stream')
    .get((req, res, next) => {
        let path = process.cwd()+"/public/pano.mp4";
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

            let file = fs.createReadStream(path, { start: start, end: end });
            res.writeHead(206, {
                'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4'
            });
            file.pipe(res);
        } else {
            console.log('ALL: ' + total);
            res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
            fs.createReadStream(path).pipe(res);
        }
    });
/*
* CRUD operations
*/    
router.route('/')
    //Retrive all videos
    .get((req, res, next) => {
        Video.paginate({}, { page: req.query.page, limit: req.query.limit }, function(err, videos) {
            if (err) {
                res.status(422).json({
                    success: false,
                    message: err.message
                });
            }
            res.json(videos);
           });
    }) 
    //Create New video
    
    //TODO Add video uploader 
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
            'latitude': {
                notEmpty: true,
                errorMessage: 'latitude is Required'
            },
            'longitude':{
                notEmpty: true,
                errorMessage: 'longitude is Required'
            },
        });
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                res.status(422).json(result.useFirstErrorOnly().mapped());
                return;
            }
            let video = req.body;
            
            video.filename="filename_"+uuid.v1()
            video.views=0
            video.likes=[]
            video.dislikes=[]
            video.comments=[]
            console.log("-----------------------------------")
            console.log(req.user)
            console.log("-----------------------------------")

            video.owner=req.user._id
            //TODO add new tag
            if(!video.hasOwnProperty('tags')){
                video.tags=[]
            }
            //check if this category exist so put this id else create new one

            // let query = Category.findOne({name: video.category});
            // query.exec((err, category) => {
            //     if (err) {
            //         return res.status(422).json({
            //             success: false,
            //             message: err.message
            //         });
            //     }
            //     if(!category){
            //         // "category Not found" create new one
            //         let categ={
            //             "name": video.category
            //         }
            //         Category.create(categ, (err, cat) => {
            //             if (err) {
            //                 return res.status(422).json({success: false, message: err.message})
            //             }
            //             console.log("____________________")
            //             console.log(cat)
            //             console.log("____________________")
            //             video.category = "ttt"//cat._id
            //             let catid = cat._id

            //         });
            //         video.category = "123"
            //         console.log("+++++++++++")
            //         console.log(video.category)
            //         console.log("++++++++++")
            //        // video.category=catid
            //     }
            //     else{
            //         console.log("///////////////")
            //         console.log(category)
            //         video.category=category._id
            //     }
            // });
            // video.category= "yyyy"
            ///Create tag
            // else{
            //     //Check if tags is array of ids or new objects

            //     //check if this tag exist so put it in tags else create new one
            // }

            
            //res.json(video)
        
            Video.create(video, (err, user) => {
                if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
                res.json({success: true, message: "video Added Successfully"})
            });
            

        });
    });

router.route('/:videoId')
    
    ////Retrive video data
    .get((req, res, next) => {
        let query = Video.findOne({_id: req.params.videoId});
        query.lean().exec((err, video) => {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: err.message
                });
            }
            if(!video){
                return res.status(404).json({success: false, message: "Video Not found"})
            }
            if(video.likes.includes(req.user._id)){
                video.liked=true;
            }  
            else{
                video.liked=false;
            }
            console.log(req.user._id)
            video.likes=video.likes.length;
            video.dislikes=video.dislikes.length;
            res.json(video);
        });
    })

    //Delete video 
    .delete((req, res, next) => {
        Video.findOne({_id: req.params.videoId}, (err, video) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            if(!video){
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
    .put((req, res, next) =>{
        //update name,description,cat,tag
        let videoinfo = req.body;
        Video.update({_id: req.params.videoId}, {"$set": videoinfo}, (err) => {
            if (err) {
                return res.status(422).json({success: false, message: err})
            }
            res.json({success: true, message: "Video Updated Successfully"})
        });
    });
//TODO Add play video link in gui

//Comment CRUD
router.route('/:videoId/comments')
    //create new comment
    .post((req, res, next) => {
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

            commentinfo.uid=req.user._id
            //console.log(commentinfo)
            //check why each comment has _id
            Video.update({_id: req.params.videoId}, {"$push": {"comments":commentinfo}}, (err) => {
                if (err) {
                    return res.status(422).json({success: false, message: err})
                }
                res.json({success: true, message: "Comment Added and video updated Successfully "})
            });
            

        });

    });

router.route('/:videoId/comments/:commentId')
    .delete((req, res, next) => {
        Video.findOne({_id: req.params.videoId}, (err, video) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            if(!video){
                return res.status(404).json({success: false, message: "video Not found"})
            }

            let comments = video.comments

            console.log(comments)
            //delete comment from list of comments
            for (var i = 0; i <= comments.length-1 ; i++) {
                if(comments[i]._id == req.params.commentId){
                    comments.splice(i, 1)
                    break
                }
            }
            Video.update({_id: req.params.videoId}, {"$set":{comments:comments}}, (err) => {
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
                if(!video){
                    return res.status(404).json({success: false, message: "video Not found"})
                }
                // req.body = {comment:"updated data"}
                let commentdata = req.body;
                let comments=video.comments
                for (var i = 0; i <= comments.length-1 ; i++) {
                        if(comments[i]._id == req.params.commentId){
                            comments[i].comment = commentdata.comment
                            break
                        }
                }
                
                Video.update({_id: req.params.videoId}, {"$set":{comments:comments}}, (err) => {
                    if (err) {
                        return res.status(422).json({success: false, message: err})
                    }
                    res.json({success: true, message: "Comment updated and Video Updated Successfully"})
                });
            });    
        });
    });

//video likes api
router.route('/:videoId/likes')
    .post((req, res, next) => {
        Video.findOne({_id: req.params.videoId}, (err, video) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            if(!video) {
                return res.status(404).json({success: false, message: "video Not found"})
            }
            let uid=req.user._id
            //Remove user id from dislikes array
            Video.update({"$and":[{_id: req.params.videoId},{"dislikes": { "$elemMatch": { "$eq": uid}}}]}, {"$pull":{dislikes:uid}}, (err) => {
                if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
                console.log("dislikeremoved")
                //add uid to like array
                Video.update({_id: req.params.videoId},{"$addToSet": {likes:uid }}, (err) => {
                    if (err) {
                        return res.status(422).json({success: false, message: err.message})
                    }
                    res.json({success: true, message:"like added Successfully"})
                })
            })
        });
    });

//video dislikes api
router.route('/:videoId/dislikes')
    .post((req, res, next) => {
        Video.findOne({_id: req.params.videoId}, (err, video) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            if(!video) {
                return res.status(404).json({success: false, message: "video Not found"})
            }
            let uid=req.user._id
            //Remove user id from likes array
            Video.update({"$and":[{_id: req.params.videoId},{"likes": { "$elemMatch": { "$eq": uid}}}]}, {"$pull":{likes:uid}}, (err) => {
                if (err) {
                    return res.status(422).json({success: false, message: err.message})
                }
                console.log("likeremoved")
                //add uid to dislike array
                Video.update({_id: req.params.videoId},{"$addToSet": {dislikes:uid }}, (err) => {
                    if (err) {
                        return res.status(422).json({success: false, message: err.message})
                    }
                    res.json({success: true, message:"dislike added Successfully"})
                })
            })
        });
    });

//video views api
router.route('/:videoId/views')
    .post((req, res, next) => {
         Video.findOne({_id: req.params.videoId}, (err, video) => {
            if (err) {
                return res.status(422).json({success: false, message: err.message})
            }
            if(!video) {
                return res.status(404).json({success: false, message: "video Not found"})
            }
            Video.update({_id: req.params.videoId},{"$inc": {views:1 }}, (err) => {
                    if (err) {
                        return res.status(422).json({success: false, message: err.message})
                    }
                    res.json({success: true, message:"view added Successfully"})
                })
        });
    });