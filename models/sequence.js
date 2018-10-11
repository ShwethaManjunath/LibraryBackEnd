var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var config = require('config');

var Schema = mongoose.Schema;
var connection = mongoose.createConnection(config.DBHost, { useNewUrlParser: true });

autoIncrement.initialize(connection);


var sequence=new Schema({
    "_id":Number,
},{ versionKey: false })

sequence.plugin(autoIncrement.plugin, {
    model: 'sequence',
    startAt: 1,
    incrementBy: 1
});

module.exports=  mongoose.model('sequence', sequence);
