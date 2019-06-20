const http = require("http");
const fs = require("fs");

// Chargement du fichier index.html affiché au client.
const server = http.createServer((req, res) => {
  fs.readFile("./index.html", "utf-8", (error, content) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
});

// Chargement de socket.io
const io = require("socket.io").listen(server);

// Quand un client se connecte, on envoi un messages
io.sockets.on("connection", socket => {
  socket.on("nouveau_pseudo", pseudo => {
    socket.pseudo = pseudo;
  });

  socket.on("nouvelle_couleur", couleur => {
    socket.couleur = couleur;
  });

  socket.on("connexion", connexion => {
    socket.broadcast.emit("connexion", connexion);
  });

  socket.on("message", message => {
    socket.broadcast.emit(
      "message",
      "<font color=" +
        socket.couleur +
        "> <b>" +
        socket.pseudo +
        "</b>" +
        ": " +
        message +
        "</font>"
    );
  });

  socket.on("disconnect", () => {
    // eslint-disable-next-line no-console
    console.log(socket.pseudo + " est partits");
  });
});

server.listen(8080);
