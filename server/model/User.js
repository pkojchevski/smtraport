var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
username:{type:String, required:true, unique:true},
password:{type:String},
name:{type:String},
surname:{type:String},
role:{type:String}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
