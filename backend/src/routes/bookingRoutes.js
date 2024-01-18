var express = require("express");
var router = express.Router();

let ctrl = require("../controllers/bookingController");

router.route("/api/sports").get(ctrl.getAllSportTypes);

router.route("/api/facilities").get(ctrl.getAllFacilities);

router.route("/api/facilities/:typeId").get(ctrl.getAllFacilitiesByType)

router.route("/api/bookings/:facilityId").get(ctrl.getAllBookingsByFacility);

module.exports = router;