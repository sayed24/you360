exports = module.exports = function (sio) {
	sio.on('connection', (socket) => {
    	console.log('a user connected');
    	//user logged in
    	socket.on('login', (user) => {
        	socket.join('online');
        	socket.userId = user._id;
        });

        //user loggedout 
        socket.on('logout', () => {
        	socket.leave('online');
    	});

    	// client is disconnected
    	socket.on('disconnect', () => {
        	socket.leave('online');
    	});

    	//event for upload new video
    	socket.on('new video created', (videoId) => {
        	//brodcast new video id
        	socket.broadcast.to('online').emit('new video', videoId);
        });
		//event for like video
    	socket.on('likes', (videoId) => {
        	socket.broadcast.to('online').emit('increase likes', videoId);

        });
		//event for dislike video
    	socket.on('dislikes', (videoId) => {
        	socket.broadcast.to('online').emit('increase dislikes', videoId);
        });
    	//event for new comment added
    	socket.on('new comment', (comment) => {
        	//comment  = comment id -OR- comment body
	           	socket.broadcast.to('online').emit('new comment', comment);
        });
        //event for video viewed
    	socket.on('increase views count', (videoId) => {
	           	socket.broadcast.to('online').emit('increase views', videoId);
        });
          
	});
};