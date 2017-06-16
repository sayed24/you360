const mongoose = require('mongoose');
function getVideo(io,socket, videoId, emitmsg) {
    let query = mongoose.model('Video').findOne({_id: videoId}).populate('category');
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
        video.path = 'https://you360.herokuapp.com'+"/uploads/"+video.filename;
        video.thumb = 'https://you360.herokuapp.com'+"/uploads/"+video.thumb;
        video.stream ='https://you360.herokuapp.com/api/videos/' + video._id +'/stream'
        io.sockets.in('online').emit(emitmsg, video);
    })
}
exports = module.exports = function (io) {
    // Set socket.io listeners.
    let users = {};
    io.on('connection', (socket) => {
        socket.join('online');
        console.log('a user connected');
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
                user.save((err)=>{
                    if(err){
                        console.log(err.message)
                    }
                })
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

            getVideo(io,socket, videoId, 'new video')


        });
        //event for like video
        socket.on('like video', (data) => {
            mongoose.model('Video').findOne({_id: data.videoId}).then((video)=> {
                video.likes.addToSet(data.userId);
                video.dislikes.pull(data.userId);
                video.save((err) => {
                    if (err) {
                        console.log(err.message)
                    }
                    io.sockets.in('online').emit(`${data.videoId}_likes`, {likes:video.likes.length,dislikes:video.dislikes.length});
                });
            });
        });
        //event for dislike video
        socket.on('dislike video', (data) => {
            mongoose.model('Video').findOne({_id: data.videoId}).then((video)=> {
                video.dislikes.addToSet(data.userId);
                video.likes.pull(data.userId);
                video.save((err) => {
                    if (err) {
                       console.log(err.message)
                    }
                    io.sockets.in('online').emit(`${video._id}_dislikes`, {likes:video.likes.length,dislikes:video.dislikes.length});
                });
            });
        });
        //event for new comment added
        socket.on('new comment', (data) => {
            mongoose.model('Video').findOne({_id: data.videoId}).populate('comments.uid').then((video)=> {
                video.comments.push(data.comment);
                video.save((err) => {
                    if (err) {
                        console.log(err.message)
                    }
                    io.sockets.in('online').emit(`${video._id}_comments`,video.comments);
                });
            });
        });
        //event for video viewed
        socket.on('view video', (data) => {
            mongoose.model('Video').findOne({_id:data.videoId}).then((video)=> {
                video.views+=1;
                video.save((err) => {
                    if (err) {
                        console.log(err.message)
                    }
                    io.sockets.in('online').emit(`${video._id}_views`,video.views);
                });
            });
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
