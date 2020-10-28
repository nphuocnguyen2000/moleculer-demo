"use strict";

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    
    name: String,

    price: Number,

    amout: Number,

    avatar: String,

    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },

    status:{
        type: Number,
        default: 0
    }
});

let Product_Coll = mongoose.model('product', productSchema);

module.exports  = Product_Coll ;
