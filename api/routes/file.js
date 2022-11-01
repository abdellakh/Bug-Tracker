const express = require("express");
const router = express.Router();
const files = require("../models/file");
const upload = require("../modules/uploader");
const mongoose = require("mongoose");
const User = require("../models/user")

router.post("/upload", [connectedUser, upload.any()], async (req, res) => {
  let user = req.decodedToken
    ? await User.findById(req.decodedToken.user.id)
    : {};
  let response = [];

  for (let file of req.uploadedFiles) {
    let result; // To know if fileProcess was ok & store the result of process
    /* ANCHOR Handle processing depending on file type */
    let type = typeOf(file.type);
    if (type == "image") {
      await fileProcess
        .resizeImage(file.newName)
        .then((filename) => {
          result = filename;
        })
        .catch((err) => {
          dump(err, "ERROR ON FILE UPLOAD : ");
        });
    } else if (type == "audio") {
      await fileProcess
        .compressAudio(file.newName)
        .then(() => {
          result = file.newName;
        })
        .catch((err) => {
          dump(err, "ERROR ON FILE UPLOAD : ");
        });
    } else {
      fs.renameSync(
        `${__dirname}/../uploads/tmp/${file.newName}`,
        `${__dirname}/../uploads/${file.newName}`
      );
      result = file.newName;
    }
    /* ANCHOR Handle file Process result */
    try {
      if (!!result) {
        // Create the file
        let created = await File.create({
          original: file.originalname,
          uploaded_by: user._id,
          filename: result,
          size: fs.statSync(`${__dirname}/../uploads/${file.newName}`).size,
          type: type,
          user: req.body.user_id ? req.body.user_id.toString() : null,
        });
        // Push the response
        response.push({
          success: true,
          filename: created.filename,
          original: file.originalname,
          id: created._id.toString(),
          type: created.type,
        });
      } else {
        // Else, just push response with success false
        response.push({ success: false, original: file.originalname });
      }
    } catch (error) {
      dump(error, "error in post /upload");
    }
  }
  if (response.some((f) => f.success)) {
    return res.status(200).json(response);
  } else {
    return res
      .status(500)
      .json("None of the file has been uploaded successfully");
  }
});

router.post("/uploadAttachment", function (req, res, next) {
  // Error MiddleWare for multer file upload, so if any
  // error occurs, the image would not be uploaded!
  upload(req, res, function (err) {
    if (err) {
      // ERROR occurred (here it can be occurred due
      // to uploading image of size greater than
      // 1MB or uploading different file type)
      res.send(err);
    } else {
      // SUCCESS, image successfully uploaded
      res.send("Success, Image uploaded!");
    }
  });
});

module.exports = router;
