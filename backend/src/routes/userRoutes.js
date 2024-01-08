var express = require("express");
var router = express.Router();

let ctrl = require("../controllers/userController");

router.route("/api/signup").post(ctrl.signup);

router.route("/api/login").post(ctrl.login);

router.route("/api/user/:id/bookings").get(ctrl.getAllBookingsByUser);

router.route("/api/user/:id/bookings").post(ctrl.addBooking);

module.exports = router;