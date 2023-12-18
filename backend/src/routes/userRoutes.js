var express = require("express");
var router = express.Router();

let ctrl = require("../controllers/userController");

router.route("/api/signup").post(ctrl.signup);

router.route("/api/login").post(ctrl.login);

router.route("/api/:user/bookings").get(ctrl.getAllBookingsByUser);

module.exports = router;