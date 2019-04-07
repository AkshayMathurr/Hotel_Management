var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
Hotels = require('./models/hotels');
Rooms = require('./models/rooms');
Users = require('./models/users');
Bookings = require('./models/booking');

app.use(bodyParser.json());

//connect to mongoose
mongoose.connect('mongodb://localhost/hotel',{ useNewUrlParser: true });
var db = mongoose.connection;

app.get('/',function(req,res){
	res.send("Please use /api/hotel");
});

//Hotel functions

app.get('/api/hotels',function(req,res){
	Hotels.getHotels(function(err,hotels){
		if(err){
			throw err;
		}
		res.json(hotels);
	})
});

app.post('/api/hotels',function(req,res){
	var hotel = req.body;
	Hotels.addHotel(hotel, function(err,hotel){
		if(err){
			throw err;
		}
		res.json(hotel);
	})
});

app.put('/api/hotels/:_id',function(req,res){
	var id = req.params._id;
	var hotel = req.body;
	Hotels.updateHotel(id,hotel,{},function(err,hotel){
		if(err){
			throw err;
		}
		res.json(hotel);
	})
});

app.delete('/api/hotels/:_id',function(req,res){
	var id = req.params._id;
	Hotels.deleteHotel(id,function(err,hotel){
		if(err){
			throw err;
		}
		res.json(hotel);
	})
});

//User functions

app.get('/api/users',function(req,res){
	Users.getUsers(function(err,users){
		if(err){
			throw err;
		}
		res.json(users);
	})
});

app.post('/api/users',function(req,res){
	var user = req.body;
	Users.addUser(user, function(err,user){
		if(err){
			throw err;
		}
		res.json(user);
	})
});

app.put('/api/user/:_id',function(req,res){
	var id = req.params._id;
	var user = req.body;
	Users.updateUser(id,user,{},function(err,user){
		if(err){
			throw err;
		}
		res.json(user);
	})
});

app.delete('/api/user/:_id',function(req,res){
	var id = req.params._id;
	Users.deleteUser(id,function(err,user){
		if(err){
			throw err;
		}
		res.json(user);
	})
});

//Rooms functions

app.get('/api/rooms',function(req,res){
	Rooms.getRooms(function(err,rooms){
		if(err){
			throw err;
		}
		res.json(rooms);
	})
});

app.get('/api/rooms/:_id',function(req,res){
	var id= req.params._id;
	Rooms.getRoomsById(id,function(err,room){
		if(err){
			throw err;
		}
		res.json(room);
	})
});

app.post('/api/rooms',function(req,res){
	var room = req.body;
	Rooms.addRoom(room, function(err,room){
		if(err){
			throw err;
		}
		res.json(room);
	})
});

//Booking functions
app.get('/api/bookings',function(req,res){
	Bookings.getBookings(function(err,bookings){
		if(err){
			throw err;
		}
		res.json(bookings);
	})
});

app.get('/api/bookings/:_id',function(req,res){
	var id= req.params._id;
	Bookings.getBookingsById(id,function(err,booking){
		if(err){
			throw err;
		}
		res.json(booking);
	})
});

app.post('/api/bookings',function(req,res){
	var booking = req.body;
	Bookings.addBooking(booking, function(err,booking){
		if(err){
			throw err;
		}
		
		res.json(booking);
	})
});

//get available rooms by status check isBlocked
app.get('/api/availableRooms/',function(req,res){
	
	var availrooms;
	Rooms.getRooms(function(err,rooms){
		if(err){
			throw err;
		}

		for(var attributename in rooms){
			if(rooms[attributename].isBooked == "true"){
				attributename++;
			}
			myfunction(rooms[attributename]);
			}
			function myfunction(roomsavailable){
				 availrooms = availrooms+roomsavailable;
			}
			res.json(availrooms);
			
	})
});

app.get('/api/bookings/:from/:to',function(req,res){
	var frm= req.params.from;
	var to = req.params.to;
	var availrooms;
	Bookings.getBookingsByDate({from:frm},{to:to},function(err,booking){
		if(err){
			throw err;
		}

		Bookings.getBookings(function(err,bookings){
		if(err){
			throw err;
		}

		Bookings.find({
			from:{$lte:frm,$gte:to}
		})
			
		for(var attributename in bookings){
			if(bookings[attributename]._id == booking[0]._id){
				attributename++;
			}
			myfunction(bookings[attributename]);
			}
			function myfunction(roomsavailable){
				 availrooms = availrooms+roomsavailable;
			}
		console.log(bookings);
	})
		 res.json(booking[0]._id);
	})
});

app.listen(3000);
console.log("Running on 3000");