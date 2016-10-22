var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/js', express.static(__dirname + '/js'));
app.use('/modules', express.static(__dirname + '/modules'));

app.get('/', function(req, res){
	res.sendFile('html/index.html', {root: __dirname })
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('Listening at http://localhost:3000');
});