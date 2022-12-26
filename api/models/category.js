const mongoose = require("mongoose");
const Schema = mongoose.Schema

const CategorySchema = Schema({
    created_at: {
        type: Date,
        default : Date.now
    },
    title : {
        type : String,
        required : true
    },
    author : {
        type : Schema.Types.ObjectID,
        ref: "User"
    },
    cards : [{
        card : {
            type : Schema.Types.ObjectID
        }
    }]
})

module.exports = mongoose.model("Categories", CategorySchema)