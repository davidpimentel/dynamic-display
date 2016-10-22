var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var modulesPath = 'modules';
var intervalId = 0;

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/modules', express.static(__dirname + '/modules'));

app.get('/', function(req, res){
	res.sendFile('html/index.html', {root: __dirname });
});

http.listen(3000, function(){
  console.log('Listening at http://localhost:3000');
});

io.on('connection', function(socket){
    console.log('socket connected');
	startEmittingModules(socket);
    socket.on('disconnect', function(socket){
        console.log('socket disconnected');
        stopEmittingModules(socket);
    });
});

function startEmittingModules(socket)
{
    modules = fs.readdirSync(modulesPath);
    console.log(modules);
    i = 0;
    intervalId = setInterval(function() {
        module = modulesPath + '/' + modules[i];
        console.log(module);
        socket.emit('src', module);
        i = (i + 1) % modules.length;
    }, 1000);
}

function stopEmittingModules(socket)
{
	clearInterval(intervalId);
}
