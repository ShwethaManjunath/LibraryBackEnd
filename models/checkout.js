var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checkout = new Schema({
    isbn:{type:String, required : true, unique: true},
    userName: {type: String,required : true},
    bookName: {type: String,required : true},
    category: {type: String},
    issuedDate:{type:String},
    returnDate:{type:String},
    returnBook:{type:Boolean},
    renewalBook:{type:Boolean}
},{ versionKey: false })

module.exports=  mongoose.model('checkout', checkout);
