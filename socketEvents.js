const mongoose = require('mongoose');
function getVideo(io,socket, videoId, emitmsg) {
    let query = mongoose.model('Video').findOne({_id: videoId});
    query.lean().exec((err, video) => {
        if (err) {
           console.log(err.message);
        }
        if (!video) {
           console.log("video not found");
           return;
        }
        video.likes = video.likes.length;
        video.dislikes = video.dislikes.length;
        video.path = socket.manager.server.hostname+"/uploads/"+video.filename;
        video.thumb = socket.manager.server.hostname+"/uploads/"+video.thumb;
        io.sockets.in('online').emit(emitmsg, video);
    })
}
exports = module.exports = function (io) {
    // Set socket.io listeners.
    let users = {};
    io.on('connection', (socket) => {
        console.log('a user connected');
        //
        // On conversation entry, join broadcast channel
        socket.on('enter conversation', (conversation) => {
            socket.join(conversation);
            // console.log('joined ' + conversation);
        });

        socket.on('login', (user) => {
            socket.join('online');
            socket.userId = user._id;
            users[user._id] = socket;
            mongoose.model('User').findOne({_id: user._id}).then((user) => {
                user.online = true
                user.save()
            }).catch((error) => {
                console.log(error.message);
            });
        });
        socket.on('logout', () => {
            socket.leave('online');
            mongoose.model('User').findOne({_id: socket.userId}).then((user) => {
                user.online = false
                user.save()
            }).catch((error) => {
                console.log(error.message);
             });
            delete users[socket.userId];
        });
        socket.on('leave conversation', (conversation) => {
            socket.leave(conversation);
            // console.log('left ' + conversation);
        });

        socket.on('new message', (conversation) => {
            io.sockets.in(conversation).emit('refresh messages', conversation);
        });

        socket.on('new notification', (notification) => {
            mongoose.model('Notification').create(notification).then((notification) => {
                if(users[notification.to]){
                    users[notification.to].emit('refresh notifications', notification);
                }
            }).catch((error) => {
                console.log(error.message);
            });
            // io.sockets.in('online').emit('refresh notifications', notification);
        });
        socket.on('see notification', (notificationId) => {
            mongoose.model('Notification').update({_id: notificationId},{'$set':{seen:true}}).then((noti) => {
            }).catch((error) => {
                console.log(error);
            });
        })

        //manar events
        //event for upload new video
        socket.on('new video created', (videoId) => {
            //brodcast new video id
            //get video info

            getVideo(io, videoId, 'new video')


        });
        //event for like video
        socket.on('likes', (videoId) => {
            getVideo(io,socket,videoId, 'increase likes')
        });
        //event for dislike video
        socket.on('dislikes', (videoId) => {
            getVideo(io,socket, videoId, 'increase dislikes')

            //io.sockets.in('online').emit('increase dislikes', videoId);
        });
        //event for new comment added
        socket.on('new comment', (comment) => {
            //comment  = comment id -OR- comment body
            io.sockets.in('online').emit('new comment', comment);
        });
        //event for video viewed
        socket.on('increase views count', (videoId) => {
            getVideo(io,socket, videoId, 'increase views')
            //io.sockets.in('online').emit('increase views', videoId);
        });


        socket.on('disconnect', () => {

            mongoose.model('User').findOne({_id: socket.userId}).then((user) => {
                user.online = false
                user.save();
            }).catch((error) => {
                console.log(error.message);
            });
            socket.leave('online');
            delete users[socket.userId];

            // console.log('user disconnected');
        });
    });
};
