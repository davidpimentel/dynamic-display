var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var modulesPath = 'modules';

app.use('/js', express.static(__dirname + '/js'));
app.use('/modules', express.static(__dirname + '/modules'));

app.get('/', function(req, res){
	res.sendFile('html/index.html', {root: __dirname })
});

http.listen(3000, function(){
  console.log('Listening at http://localhost:3000');
});

io.on('connection', function(socket){
	
	startEmittingModules(socket)
});

io.on('disconnect', function(socket){

	stopEmittingModules(socket)
});

function startEmittingModules(socket)
{
    modules = fs.readdirSync(modulesPath);
    i = 0;
    setInterval(function() {
        module = modulesPath + '/' + modules[i];
        socket.emit('src', module);
        i = (i + 1) % modules.length;
    }, 1000);
}

function stopEmittingModules(socket)
{
	clearInterval()
}