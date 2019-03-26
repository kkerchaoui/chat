var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on envoi un message
io.sockets.on('connection', function (socket) {
   

	socket.on('nouveau_pseudo', function(pseudo){
		socket.pseudo= pseudo;
	})

	socket.on('nouvelle_couleur', function(couleur){
		socket.couleur= couleur;
	})


	socket.on('connexion', function(connexion){
		socket.broadcast.emit('connexion', connexion);
	})

    socket.on('message', function(message){
    	socket.broadcast.emit('message',  '<font color='+ socket.couleur +'> <b>' + socket.pseudo + '</b>' +  ': ' + message +'</font>');
    })


    socket.on('disconnect', function () {
    	console.log( socket.pseudo +  ' est partit');		
    })
});



server.listen(8080);