const sharp = require("sharp");
const fs = require("fs");
const exec = require("child_process").exec;
const FileProcessing = {
  resizeImage: async (fileName) => {
    return new Promise((resolve, reject) => {
      sharp(`${__dirname}/../uploads/tmp/${fileName}`)
        .resize({
          width: 1200,
        })
        .toFile(`${__dirname}/../uploads/${fileName}`, function (err) {
          fs.unlinkSync(`${__dirname}/../uploads/tmp/${fileName}`);
          if (err) {
            return reject(err);
          } else {
            return resolve(fileName);
          }
        });
    });
  }
};
module.exports = FileProcessing;
