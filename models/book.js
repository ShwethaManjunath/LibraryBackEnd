var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: {type: String,required : true, unique: true},
    isbn: {type: String,required : true, unique: true},
    author: {type: String},
    publishDate: {type: String},
    publisher: {type: String},
    url: {type: String},
    picUrl: {type: String},
    totalPage: {type: Number},
    category: {type: String, required : true},
    quantity: {type: Number, required : true},
},{ versionKey: false })

module.exports=  mongoose.model('books', bookSchema);
