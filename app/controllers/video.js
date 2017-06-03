const router = require('express').Router(),
    passport = require('passport'),
    fs = require('fs'),
    url = require("url"),
    path = require("path"),
    uuid = require('uuid');
    helpers = require('../helpers'),
    config = require('../../config/config'),
    User = require('mongoose').model('User');
    Video = require('mongoose').model('Video');
    Category =  require('mongoose').model('Category');
    Tag = require('mongoose').model('Tag');

const requireAuth = passport.authenticate('jwt', {session: false});

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
    //Show video info
    .get((req, res, next) => {
        let query = Video.findOne({_id: req.params.videoId});
        query.exec((err, video) => {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: err.message
                });
            }
            if(!video){
                return res.status(404).json({success: false, message: "Video Not found"})
            }
            res.json(video);
        });
    });
//TODO Add play video link in gui