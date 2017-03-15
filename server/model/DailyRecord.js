var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dailyRecordSchema = new Schema({
recordId:{type:String},
name:{type:String},
index:{type:String},
value:{type:String},
prodData:{type:Date},
details:{type:String}
});

var DailyRecord = mongoose.model('DailyRecord', dailyRecordSchema);

module.exports = DailyRecord;
