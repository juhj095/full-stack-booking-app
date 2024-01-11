var express = require("express");
var router = express.Router();

let ctrl = require("../controllers/userController");

router.route("/api/signup").post(ctrl.signup);

router.route("/api/login").post(ctrl.login);

router.route("/api/user/:id/bookings").get(ctrl.verifyJWT, ctrl.getAllBookingsByUser);

router.route("/api/user/:id/bookings").post(ctrl.verifyJWT, ctrl.addBooking);

router.route("/api/user/:id/bookings").delete(ctrl.verifyJWT, ctrl.deleteBooking);

module.exports = router;