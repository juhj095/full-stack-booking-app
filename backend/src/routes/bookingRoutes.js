var express = require("express");
var router = express.Router();

let ctrl = require("../controllers/bookingController");

router.route("/api/facilities/:typeId").get(ctrl.getAllFacilitiesByType)

router.route("/api/bookings/:facilityId").get(ctrl.getAllBookingsByFacility);

module.exports = router;