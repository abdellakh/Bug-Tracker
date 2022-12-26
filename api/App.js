require("dotenv/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

let connectDB = async () => {
  var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.suxewcm.mongodb.net/test`,
      options
    )
    .then(() => {
      console.log("\n");
      console.log("Database", "Connected");
    })
    .catch((error) => {
      console.log("\n");
      console.log("Database", "Failed to connect");
      console.log("\n");
      console.log(error);
    });
};
connectDB();

app.listen(5000, () => {
  setTimeout(() => {
    console.log("\n");
    console.log("Server", "Running...");
    console.log("Listening", "5000");
  }, 500);
  // wsServer.init(server);
});

app.get("/", function (req, res) {
  return res.status(200).json({
    success: true,
    message: "ROUTE OK",
  });
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", require("./routes/register"))
app.use("/", require("./routes/user"))
app.use("/", require("./routes/carte"))
app.use("/", require("./routes/category"))
app.use("/", require("./routes/file"))
app.use("/", require("./routes/security"))
app.use("/", require("./routes/register"))
