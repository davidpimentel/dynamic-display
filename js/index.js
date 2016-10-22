var socket = io();

socket.on("src", function(url){
	$("iframe").attr("src", url)
});