var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weeklyRecordSchema = new Schema({
weeklyRecordId:{type:String},
name:{type:String},
text:{type:String},
value:{type:String},
dateOfProd:{type:Date},
details:{type:String}
});

var WeeklyRecord = mongoose.model('WeeklyRecord', weeklyRecordSchema);

module.exports = WeeklyRecord;
