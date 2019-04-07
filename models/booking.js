var mongoose = require('mongoose');

//booking schema
var bookingschema = mongoose.Schema({
userId: {
	type: String,
	required:true
},
roomno : {
	type: String,
	required: true
},
from: {
	type: String,
	required: true
},
to:{
	type: String,
	required: true
}
});

var Bookings = module.exports = mongoose.model('bookings',bookingschema);

//get bookings
module.exports.getBookings = function(callback,limit){
	Bookings.find(callback);
}

//get bookings by id
module.exports.getBookingsById = function(id,callback){
	Bookings.findById(id,callback);
}

//add hotels
module.exports.addBooking = function(booking,callback){
	Bookings.create(booking,callback);
}

//get available rooms bt date range
module.exports.getBookingsByDate = function(frm,to,callback){
	Bookings.find(frm,to,callback);
}