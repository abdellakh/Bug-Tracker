const multer = require("multer");
const uuid = require("uuid/v4");
const fs = require("fs");

/* Multer configuration */
const UPLOAD_DIR = `${__dirname}/../uploads/tmp`;

// Ensure the upload directories are existing.
if (!fs.existsSync(`${__dirname}/../uploads`))
  fs.mkdirSync(`${__dirname}/../uploads`);

if (!fs.existsSync(`${__dirname}/../uploads/tmp`))
  fs.mkdirSync(`${__dirname}/../uploads/tmp`);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    let ext =
      file.originalname.split(".")[file.originalname.split(".").length - 1]; // Get file ext
    let renamed = file.fieldname + "-" + Date.now() + uuid() + "." + ext; // Rename the file..
    // Append the file to the request uploadedFiles, this will be used to manage files in database etc.
    let uploaded = {
      originalname: file.originalname.substring(
        0,
        file.originalname.length - (ext.length + 1)
      ),
      newName: renamed,
      type: file.mimetype,
    };
    if (req.uploadedFiles) {
      req.uploadedFiles.push(uploaded);
    } else {
      req.uploadedFiles = [uploaded];
    }
    cb(null, renamed);
  },
});


module.exports = multer({ storage: storage });
