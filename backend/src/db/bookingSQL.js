var mysql = require("mysql");
var dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const executeSQL = (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, result, fields) => {
            error ? reject(error) : resolve(result);
        });
    });
}

const getAllFacilitiesByType = (typeId) => {
    const query = "SELECT id, name, address FROM Facility WHERE FacilityType_id=(SELECT id FROM FacilityType WHERE type=?)";
    return executeSQL(query, [typeId]);
}

const getAllBookingsByFacility = (facilityId) => {
    const query = "SELECT id, time FROM Booking WHERE Facility_id=?";
    return executeSQL(query, [facilityId]);
}

module.exports = { getAllFacilitiesByType, getAllBookingsByFacility };