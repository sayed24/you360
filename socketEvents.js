const mongoose = require('mongoose');
exports = module.exports = function (io) {
    // Set socket.io listeners.
    let users = {};
    io.on('connection', (socket) => {
        // console.log('a user connected');
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
            // mongoose.model('User').findOne({_id: user._id}).then((user) => {
            //     user.online = true
            //     user.save()
            // }).catch((error) => {
            //     console.log(error.message);
            // });
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
        socket.on('disconnect', () => {
            socket.leave('online');
            mongoose.model('User').findOne({_id: socket.userId}).then((user) => {
                user.online = false
                user.save()
            }).catch((error) => {
                console.log(error.message);
            });
            delete users[socket.userId];

            // console.log('user disconnected');
        });
    });
};
