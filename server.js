var express = require('express');
var app = express();
var httpd  = require('http').createServer(app);

var io = require('socket.io').listen(httpd);
app.use(express.static(__dirname+ '/public'))
// when a client connects
io.sockets.on('connection', function (socket) {
    //socket.emit('login');

    socket.on('username', function(data){
        console.log("user login")
        console.log(data)
        socket.username = data.username;
        socket.emit('user-joined', {username: data.username});
   });
    // listen to incoming bids
    socket.on('bid', function(content) {
        console.log(content)
         // echo to the sender
         socket.emit('bid', {amount: content.amount});

      // broadcast the bid to all clients
         socket.broadcast.emit('bidAll', socket.username + 'bid: ' + content.amount);

    });

});
    //index
    app.get('/', (req, res) => {
        console.log('Hi!')
        
        res.redirect('index.html', {})
    })
    //end index
// create the server
httpd.listen(5555, function(){
    console.log('Auction server running 5555'); 
   });