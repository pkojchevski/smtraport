var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weeklyProductSchema = new Schema({
productIndex:{type:Number, required:true},
pcbs100:{type:String},
dailyQuantity:{type:Number},
prodData:{type:Date},
description:{type:String},
pcbsonpanel:{type:Number},
productId:{type:String}
});

var WeeklyProduct = mongoose.model('WeeklyProduct', weeklyProductSchema);

module.exports = WeeklyProduct;
