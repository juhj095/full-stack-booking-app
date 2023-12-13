var express = require("express");
var router = express.Router();

let ctrl = require("../controllers/bookingController");

router.route("/api/facilities").get(ctrl.getAllFacilities)

module.exports = router;