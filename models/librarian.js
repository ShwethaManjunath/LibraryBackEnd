var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var librarianSchema = new Schema({
    LibrarianID: {type: String,required : true, unique: true},
    Email: {type: String,required : true, unique: true},
    Name: {type: String,required : true},
    Address: {type: String}
},{ versionKey: false })

module.exports=  mongoose.model('librarian', librarianSchema);
