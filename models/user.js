var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

var userSchema = new Schema({
    userID: {type: String, required : true, unique: true},
    email: {type: String, required : true, unique: true},
    name: {type: String, required : true},
    password: {type: String, required : true},
    role : {type: String, required : true}
},{ versionKey: false })

module.exports=  mongoose.model('user', userSchema);




