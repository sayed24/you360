const router = require('express').Router(),
    passport = require('passport'),
    fs = require('fs'),
    url = require("url"),
    path = require("path"),
    helpers = require('../helpers'),
    config = require('../../config/config'),
    User = require('mongoose').model('User');
const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function (app) {
    app.use('/api/videos', router);
};
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