var mongoose = require('mongoose');

//hotel schema
var userschema = mongoose.Schema({
name: {
	type: String,
	required:true
},
email:{
	type: String,
	required : true
},
mob_no:{
	type: String,
	required: true
}
});

var Users = module.exports = mongoose.model('users',userschema);

//get hotels
module.exports.getUsers = function(callback,limit){
	Users.find(callback).limit(limit);
}

//add hotels
module.exports.addUser = function(hotel,callback){
	Users.create(hotel,callback);
}

//update hotel
module.exports.updateUser = function(id, user, options, callback){
	var query = {_id: id};
	var update = {
		name: user.name,
		email:user.email,
		mob_no:user.mob_no

	}
	Users.findOneAndUpdate(query, update, options, callback);
}

//delete hotels
module.exports.deleteUser = function(id,callback){
	var query = {_id:id};
	Users.remove(query,callback);
}