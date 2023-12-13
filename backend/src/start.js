var express = require("express");

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

const bookingRoutes = require("./routes/bookingRoutes");
app.use(bookingRoutes);

const port = 3004;
const hostname = "127.0.0.1";

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});