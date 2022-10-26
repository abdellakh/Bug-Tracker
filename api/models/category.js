const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
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
        ref: "Users"
    },
    cards : [{
        card : {
            type : Schema.Types.ObjectID
        }
    }]
})

module.exports = mongoose.model("Categories", CategorySchema)