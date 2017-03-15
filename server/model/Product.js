var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
productIndex:{type:Number, required:true, unique:true},
description:{type:String, required:true},
pcbsonpanel:{type:Number, required:true},
pcbs100:{type:Number, required:true},
username:{type:String},
createdAt:{type:Date}
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;
