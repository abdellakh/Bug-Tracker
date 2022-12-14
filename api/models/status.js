const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StatusSchema = Schema({
    created_at : {
        type : Date,
        default: Date.now
    },
    title : {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    author : {
        type : Schema.Types.ObjectID,
        ref : "User"
    }
})

module.exports = mongoose.module("Status", StatusSchema)