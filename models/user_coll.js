"use strict";


let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username:  {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    name: String,
    password: String,
    phone: String,
    age: String,
    email: String,
    sex:{
        type: Number,
        // 1: Nam
        // 0: Nữ
        default: 0
    },
    role:{
        type: Number,
        //  1: Admin
        //  2: Editor
        //  0: User 
        default: 0
    }
});

let USER_COLL  = mongoose.model('user', userSchema);

module.exports = USER_COLL;