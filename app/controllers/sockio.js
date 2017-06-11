const mongoose = require('mongoose');

exports = module.exports = function (sio) {
	sio.on('connection', (socket) => {
    	//console.log('a user connected');
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
            //get video info
                
            get_video_info(sio,videoId,'new video')
            
        	
        });
		//event for like video
    	socket.on('likes', (videoId) => {
            get_video_info(sio,videoId,'increase likes')
        	

        });
		//event for dislike video
    	socket.on('dislikes', (videoId) => {
            get_video_info(sio,videoId,'increase dislikes')

        	//sio.sockets.in('online').emit('increase dislikes', videoId);
        });
    	//event for new comment added
    	socket.on('new comment', (comment) => {
        	//comment  = comment id -OR- comment body
	        sio.sockets.in('online').emit('new comment', comment);
        });
        //event for video viewed
    	socket.on('increase views count', (videoId) => {
            get_video_info(sio,videoId,'increase views')
	        //sio.sockets.in('online').emit('increase views', videoId);
        });
          
	});
};

get_video_info = function get_video_info(sio,videoId,emitmsg) {
                    let query =  mongoose.model('Video').findOne({_id:videoId});
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
                        video.likes = video.likes.length;
                        video.dislikes = video.dislikes.length;
                        sio.sockets.in('online').emit(emitmsg, video);
                    })
                }