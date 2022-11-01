const mongoose = require("mongoose")
const fs = require("fs")

const FileSchema = mongoose.Schema({
    created_at : {
        type : Date,
        default: Date.now
    },
    fileName : {
        type : String,
    },
    type: {
        type: String, // Could be "audio", "image", "pdf"
    },
    uploaded_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})

FileSchema.pre("remove", async function (next) {
    if (fs.existsSync(`${__dirname}/../uploads/${this.filename}`)) {
        fs.unlinkSync(`${__dirname}/../uploads/${this.filename}`);
    }
    next();
});

module.exports = mongoose.model("Files", FileSchema);