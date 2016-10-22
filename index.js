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

io.on('connection', function(socket){
    modules = fs.readdirSync(modulesPath);
    i = 0;
    setInterval(function() {
        module = modulesPath + '/' + modules[i];
        io.emit('src', module);
        i = (i + 1) % modules.length;
    }, 5000);
});

http.listen(3000, function(){
  console.log('Listening at http://localhost:3000');
});
