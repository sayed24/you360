const mongoose = require('mongoose');
exports = module.exports = function (io) {
    // Set socket.io listeners.
    let users = {};
    io.on('connection', (socket) => {
        // console.log('a user connected');

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
        socket.on('checkout', (order) => {
            mongoose.model('Order').findOne({_id: order.id}).populate({path: 'items.item'}).then((order) => {
                let checkout = {};
                //calculate checkout
                order.items.forEach((item) => {
                    if (checkout[item.orderBy]) {
                        checkout[item.orderBy].push({
                            name: item.item.name,
                            price: item.item.price,
                            amount: item.amount,
                            total: item.amount * item.item.price
                        });
                    } else {
                        checkout[item.orderBy] = [{
                            name: item.item.name,
                            price: item.item.price,
                            amount: item.amount,
                            total: item.amount * item.item.price
                        }];
                    }
                    //send notification and emit order checkout for all users
                    for (let user in checkout) {
                        if(String(user)!=String(order.owner)){
                            mongoose.model('Notification').create({
                                to: user,
                                type:"checkout",
                                link: order.id,
                                message: 'Prepare your Money',
                                details: checkout[user]
                            }).then((notification) => {
                                users[user].emit('order checkout', checkout[user]);
                                users[notification.to].emit('refresh notifications', notification);
                            }).catch((error) => {
                                console.log(error.message);
                            });
                        }

                    }
                    // change order state to checked out
                    order.checkout = true;
                    order.save((err) => {
                        if (err) {
                            console.log(err.message)
                        }
                    })
                });
            }).catch((error) => {
                console.log(error.message);
            });
        });
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
