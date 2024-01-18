const sql = require("../db/bookingSQL");

const getAllSportTypes = async (req, res) => {
    try {
        const sportTypes = await sql.getAllSportTypes();
        res.status(200).json(sportTypes);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getAllFacilities = async (req, res) => {
    try {
        const facilities = await sql.getAllFacilities();
        res.status(200).json(facilities);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getAllFacilitiesByType = async (req, res) => {
    try {
        const facilities = await sql.getAllFacilitiesByType(req.params.typeId);
        res.status(200).json(facilities);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getAllBookingsByFacility = async (req, res) => {
    try {
        const bookings = await sql.getAllBookingsByFacility(req.params.facilityId);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { getAllSportTypes, getAllFacilities, getAllFacilitiesByType, getAllBookingsByFacility };