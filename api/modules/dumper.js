const chronos = require("./chronos");
const chalk = require("chalk");

const green = chalk.hex("#009107");
const yellow = chalk.hex("#fbff00");
const red = chalk.hex("#eb0d0d");
const cyan = chalk.hex("#00d4d4");
const blue = chalk.hex("#0059ff");
const gray = chalk.hex("#bebebe");

const doc = {
  doc: "dumper.doc();",
  debug:
    "dumper.debug(<String message>, <Boolean status == true || false || null>);",
  debug_message: "dumper.debug_message(<String title>, <String message>);",
  dump: "dumper.dump(<Object object>, <String message || null>)",
};
let time = () => {
  let date = new Date();
  console.log("\n    " + cyan.italic(chronos(date, true, true, true)));
};
let display = (status, color, message, object, location) => {
  console.log(color.bold(`Status :\t${status}`));
  location ? console.log(gray.italic(`Location :\t${location}`)) : null;
  message ? console.log(gray.italic(`Message :\t${message}`)) : null;
  object ? console.log(object) : null;
};
let display_error = (status, message, doc, color) => {
  console.log(color(`Status :\t${status}`));
  console.log(`Message :\t${message}`);
  console.log(`Doc :\t\t${doc}`);
};

module.exports.debug = (message, status, location) => {
  time();

  if (
    message == null ||
    (status != undefined && status != true && status != false)
  ) {
    display_error(
      "READ THE FUCKING MANUAL !",
      "Bad use of dumper",
      doc.debug,
      chalk.red
    );
    return false;
  }
  let color;
  if (status == undefined) {
    status = "INFO";
    color = blue;
  } else if (status) {
    status = "SUCCESS";
    color = green;
  } else if (!status) {
    status = "ERROR";
    color = red;
  }

  display(status, color, message, false, location);
};
module.exports.debug_message = (title, message) => {
  if (title === null || message == null) {
    display_error(
      "READ THE FUCKING MANUAL !",
      "Bad use of dumper",
      doc.debug_message,
      chalk.red
    );
    return false;
  }
  message ? console.log(gray.italic(`${title} \t:\t\t${message}`)) : null;
};
module.exports.dump = (object, message) => {
  time();

  if (object == null) {
    display_error(
      "OOPS !",
      "An error occured, your object is null or bad syntax",
      doc.dump,
      chalk.red
    );
    return false;
  }

  display("DEBUG", yellow, message || null, object);
};
module.exports.doc = () => {
  time();
  console.log(yellow.italic("DOCUMENTATION : "));
  console.log(
    gray(
      JSON.stringify(doc)
        .replace(/"/g, "")
        .replace(/;,/g, "\n")
        .replace(/{/g, "")
        .replace(/}/g, "")
        .replace(/:/g, " => ")
    )
  );
};
module.exports.space = () => {
  console.log("\n\n\n");
  console.log("##########################################");
  console.log("##########################################");
  console.log("\n\n\n");
};
