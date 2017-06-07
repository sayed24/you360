const should = require('should');
const request = require('supertest');
const app = require('../app');
const URI = require('./spec_helper').URI;
const server = require('../app/controllers/sockio');
var io = require('socket.io-client');

var options ={
  transports: ['websocket'],
  'force new connection': true
};

//var socketURL ='http://' + URI + ':3000';
var socketURL ='http://localhost:3000'
const User1 = { _id: '123', password: 'secret1', lastName: 'test', firstName: 'u1', email: 'u1@exampledomain.com' };
const User2 = { _id: '1234', password: 'secret', lastName: 'test', firstName: 'u2', email: 'u2@exampledomain.com' };
const User3 = { _id: '12345', password: 'secret', lastName: 'test', firstName: 'u3', email: 'u3@exampledomain.com' };

const videoId = "59334fd7f25144336c3e4078"
const comment = "hello. "

describe('************* Socket Test *************',function(){
	this.timeout(50000);
	/* Test 1 - User uploade new video.*/
	it('Should broadcast new video',function(done){
		//this.timeout(15000);
    	//setTimeout(done, 15000)
		//let client = io.connect(socketURL);
		try{
			let client1, client2, client3;
			let count=0;
			var checkvideoid = function(client){
				client.on('new video', function(vid){
		        	vid.should.equal(videoId);
		        	client.disconnect();
		        	count++;
		        	if(count === 3){
		        		done();
		        	};
		        });
			};
	        client1 = io.connect(socketURL);
			
			client1.on('connect', function(data){
				//login
				client1.emit('login',User1)
				checkvideoid(client1);
				 /* Since first client is connected, we connect the second client. */
				client2 = io.connect(socketURL);
				client2.on('connect', function(data){
					client2.emit('login',User2)
					checkvideoid(client2);
					client3 = io.connect(socketURL);
					
					client3.on('connect', function(data){
						client3.emit('login',User3)
						checkvideoid(client3);
	  					client2.emit('new video created',videoId)
	  				//end of client3
	  				});
	  			//end of client2	
				});
			//end of client1
			});
		}
		catch(err){
			done(err)
		}        
	// end of it
	});


/* Test 2 - User like a video.*/
	it('Should broadcast one of the videos liked',function(done){
		//this.timeout(15000);
		let client1, client2, client3;
		let count=0;
		var checkvideoid = function(client){
			client.on('increase likes', function(vid){
	        	vid.should.equal(videoId);
	        	client.disconnect();
	        	count++;
	        	if(count === 3){
	        		done();
	        	};
	        });
		};
        client1 = io.connect(socketURL);
		
		client1.on('connect', function(data){
			//login
			client1.emit('login',User1)
			checkvideoid(client1);
			 /* Since first client is connected, we connect the second client. */
			client2 = io.connect(socketURL);
			client2.on('connect', function(data){
				client2.emit('login',User2)
				checkvideoid(client2);
				client3 = io.connect(socketURL);
				
				client3.on('connect', function(data){
					client3.emit('login',User3)
					checkvideoid(client3);
  					client2.emit('likes',videoId)
  				//end of client3
  				});
  			//end of client2	
			});
		//end of client1
		});        
	// end of it
	});

/* Test 3 - User dislike a video.*/
	it('Should broadcast one of the videos disliked',function(done){
		this.timeout(15000);
		let client1, client2, client3;
		let count=0;
		var checkvideoid = function(client){
			client.on('increase dislikes', function(vid){
	        	vid.should.equal(videoId);
	        	client.disconnect();
	        	count++;
	        	if(count === 3){
	        		done();
	        	};
	        });
		};
        client1 = io.connect(socketURL);
		
		client1.on('connect', function(data){
			//login
			client1.emit('login',User1)
			checkvideoid(client1);
			 /* Since first client is connected, we connect the second client. */
			client2 = io.connect(socketURL);
			client2.on('connect', function(data){
				client2.emit('login',User2)
				checkvideoid(client2);
				client3 = io.connect(socketURL);
				
				client3.on('connect', function(data){
					client3.emit('login',User3)
					checkvideoid(client3);
  					client2.emit('dislikes',videoId)
  				//end of client3
  				});
  			//end of client2	
			});
		//end of client1
		});        
	// end of it
	});

	/* Test 4 - User views a video.*/
	it('Should broadcast one of the videos viewed',function(done){
		this.timeout(15000);
		let client1, client2, client3;
		let count=0;
		var checkvideoid = function(client){
			client.on('increase views', function(vid){
	        	vid.should.equal(videoId);
	        	client.disconnect();
	        	count++;
	        	if(count === 3){
	        		done();
	        	};
	        });
		};
        client1 = io.connect(socketURL);
		
		client1.on('connect', function(data){
			//login
			client1.emit('login',User1)
			checkvideoid(client1);
			 /* Since first client is connected, we connect the second client. */
			client2 = io.connect(socketURL);
			client2.on('connect', function(data){
				client2.emit('login',User2)
				checkvideoid(client2);
				client3 = io.connect(socketURL);
				
				client3.on('connect', function(data){
					client3.emit('login',User3)
					checkvideoid(client3);
  					client2.emit('increase views count',videoId)
  				//end of client3
  				});
  			//end of client2	
			});
		//end of client1
		});        
	// end of it
	});

	/* Test 5 - User commented on video.*/
	it('Should broadcast new comment',function(done){
		this.timeout(15000);
		let client1, client2, client3;
		let count=0;
		var checkvideoid = function(client){
			client.on('new comment', function(newcomment){
	        	newcomment.should.equal(comment);
	        	client.disconnect();
	        	count++;
	        	if(count === 3){
	        		done();
	        	};
	        });
		};
        client1 = io.connect(socketURL);
		
		client1.on('connect', function(data){
			//login
			client1.emit('login',User1)
			checkvideoid(client1);
			 /* Since first client is connected, we connect the second client. */
			client2 = io.connect(socketURL);
			client2.on('connect', function(data){
				client2.emit('login',User2)
				checkvideoid(client2);
				client3 = io.connect(socketURL);
				
				client3.on('connect', function(data){
					client3.emit('login',User3)
					checkvideoid(client3);
  					client2.emit('new comment',comment)
  				//end of client3
  				});
  			//end of client2	
			});
		//end of client1
		});        
	// end of it
	});

// end of describe
});