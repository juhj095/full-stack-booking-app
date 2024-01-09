var express = require("express");
require("dotenv").config();

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

var cors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}

app.use(cors);

const bookingRoutes = require("./routes/bookingRoutes");
app.use(bookingRoutes);

const userRouter = require("./routes/userRoutes");
app.use(userRouter);

const port = 3004;
const hostname = "127.0.0.1";

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});