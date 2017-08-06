var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// http.listen(app.get('port')); 

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/build/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('game-event', function(data) {
    console.log("on game event in server.js")
    io.emit('receive data', data)
  })

});

http.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

app.use(express.static('client/build'));


// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
// });
