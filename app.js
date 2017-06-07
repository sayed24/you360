var express = require('express'),
    config = require('./config/config'),
    glob = require('glob'),
    // socketEvents = require('./socketEvents'),
	socketEvents = require('./app/controllers/sockio.js'),
    mongoose = require('mongoose'),
    socketIO = require('socket.io');

mongoose.connect(config.db);
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
    require(model);
});
var app = express();
module.exports = require('./config/express')(app, config);
passportService = require('./config/passport');
app.use((socket, next)=>{

});

let server=app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});
//socket io server
const io = socketIO.listen(server);
// io.set('origins','*:*');
socketEvents(io);



