var socket = io.connect('http://localhost');
socket.on('connect', function(){
    console.log('connected');
});
socket.on('event', function(data){
    console.log('event');
});
socket.on('disconnect', function(){
    console.log('disconnect');
});

