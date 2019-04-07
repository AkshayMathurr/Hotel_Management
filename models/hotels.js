var mongoose = require('mongoose');

//hotel schema
var hotelschema = mongoose.Schema({
name: {
	type: String,
	required:true
},
Create_date:{
	type: Date,
	default : Date.now
}
});

var Hotels = module.exports = mongoose.model('hotels',hotelschema);

//get hotels
module.exports.getHotels = function(callback,limit){
	Hotels.find(callback).limit(limit);
}

//add hotels
module.exports.addHotel = function(hotel,callback){
	Hotels.create(hotel,callback);
}

//update hotel
module.exports.updateHotel = function(id, hotel, options, callback){
	var query = {_id: id};
	var update = {
		name: hotel.name
	}
	Hotels.findOneAndUpdate(query, update, options, callback);
}

//delete hotels
module.exports.deleteHotel = function(id,callback){
	var query = {_id:id};
	Hotels.remove(query,callback);
}