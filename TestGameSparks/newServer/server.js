var io = require('socket.io')(process.env.Port || 1337);

console.log('server started');
var room_0 = "room_0";
var playersInGame = {};

io.on('connection', function(socket){
	var player = new Player(0, 0, 0, socket.id); // x, y, z, id
	playersInGame[player.id] = player;
	socket.join(room_0);
	console.log("\nClient " + socket.id + " has connected. " + Object.keys(playersInGame).length + " Player(s) in Game.");

	for(player in playersInGame){ //Send all players in game to new client (including client player)
		console.log(playersInGame[player]);
		io.to(socket.id).emit("ADD_PLAYER", playersInGame[player]);
	}

	socket.broadcast.emit("ADD_PLAYER", playersInGame[socket.id]); //Send all players new client (except client player)

	socket.on("MOVE_REQUEST", function(mov_vector){ [-1,0,1]
		console.log(socket.id);
		//playersInGame[socket.id].position[0] += mov_vector.x;  //* player.speed;
		//playersInGame[socket.id].position[1] += mov_vector.y; // *
		//playersInGame[socket.id].position[2] += mov_vector.z; // *

		socket.emit("UPDATE_PLAYER", playersInGame[socket.id]);
	});

	socket.on('disconnect', function(){
		socket.broadcast.emit("REMOVE_PLAYER", socket.id); // Tell the everyone in the game to delete the player that left
		delete playersInGame[socket.id]; //Remove the player from player list
		console.log("\nClient " + socket.id + " has disconnected. " + Object.keys(playersInGame).length + " Player(s) in Game.");
	});

});

function Player(x,y,z,id){
	this.id = id;
	this.position = [x,y,z];
	this.speed = 2;
}

/*
Using an Objest instead of an array
Ill explain the advantages and possible disadvantages
*/
/*
Instead of using playersInGame.push(player), we can use an Anonymous OBJECT
playersInGame[player.id] = player;
if player.id = 9933
an ARRAY would look like this playersInGame[undefined, undefined, undefined, ..., player ]
an Initialized Anonymous Object looks like this:
{
9933:{
id:9933,
position:[0,0,0],
speed: 2
}
}
*/
