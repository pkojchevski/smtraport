var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dailyProductSchema = new Schema({
productIndex:{type:Number, required:true},
pcbs100:{type:Number},
dailyQuantity:{type:Number},
prodData:{type:Date},
description:{type:String},
pcbsonpanel:{type:Number},
productId:{type:String}
});

var DailyProduct = mongoose.model('DailyProduct', dailyProductSchema);

module.exports = DailyProduct;
