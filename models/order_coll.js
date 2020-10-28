"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let orderSchema = new Schema({
	products: [{
        type: Schema.Types.ObjectId,
        ref: 'product',
        default: []
    }],

    total: Number,

    address: String,

    time: String,

    note: String,

    payment: String,

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    
    status: Number
}, {
	timestamps: true
});

// Add index
// LikeSchema.index({user: 1, post: 1}, {unique: true});

module.exports = mongoose.model("order", orderSchema);
