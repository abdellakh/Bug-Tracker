const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    userName : {
        type : String,
        required: true
    },
    firstName : { 
        type : String ,
        required: true
    },
    lastName : {
        type : String,
        required: true
    }, 
    email: {
        type : String, 
        required: true
    },
    password : {
        type: String, 
        required : true 
    },
    role:{
        type : String, 
        default : "user" // "dev" , "admin"
    },
    created_at : {
        type : Date,
        default : Date.now,
    },
    last_login : {
        type : Date,
        default : Date.now
    },
    validation_token : {
        type : String,
        default: null,
    }
})

module.exports = mongoose.model("Users",UserSchema)