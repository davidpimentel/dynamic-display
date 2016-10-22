var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use('/js', express.static(__dirname + '/js'));

app.get('/', function(req, res) {
    res.sendFile('html/index.html', {root: __dirname })
});

io.on('connection', function(){
    console.log("we connected yo");
});

server.listen(3000);

