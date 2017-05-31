var io = require('socket.io')(process.env.Port || 1337); // server is running on PORT 1337

console.log('server started');

var password = 200; // password to log in

io.on('connection', function(socket){
	console.log('connected');

	socket.on('loginRequest', function(data){ // recieve password called 'data'
		if(data == password){
			socket.emit('login'); // send message to client that 'data' - our password is right - 200
		} else {
			socket.emit('wrongPass') // send message to client that 'data' - our password isn't right - not 200
		}
	});
});