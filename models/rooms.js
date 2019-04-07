var mongoose = require('mongoose');

//rooms schema
var roomschema = mongoose.Schema({
hotel: {
	type: String,
	required:true
},
type:{
	type: String,
	required: true
},
floor:{
	type: Number,
	required: true
},
roomno: {
	type: Number,
	required: true
},
isBooked: {
	type: String
}
});


var Rooms = module.exports = mongoose.model('rooms',roomschema);

//get hotels
module.exports.getRooms = function(callback,limit){
	Rooms.find(callback).limit(limit);
}

//get hotels by id
module.exports.getRoomsById = function(id,callback){
	Rooms.findById(id,callback);
}

//add hotels
module.exports.addRoom = function(room,callback){
	Rooms.create(room,callback);
}

