const { executeSQL } = require("./connection");

const getAllFacilities = () => {
    const query = "SELECT id, name, address FROM Facility";
    return executeSQL(query, []);
}

const getAllFacilitiesByType = (typeId) => {
    const query = "SELECT id, name, address FROM Facility WHERE FacilityType_id=(SELECT id FROM FacilityType WHERE type=?)";
    return executeSQL(query, [typeId]);
}

const getAllBookingsByFacility = (facilityId) => {
    const query = "SELECT id, time FROM Booking WHERE Facility_id=?";
    return executeSQL(query, [facilityId]);
}

module.exports = { getAllFacilities, getAllFacilitiesByType, getAllBookingsByFacility };