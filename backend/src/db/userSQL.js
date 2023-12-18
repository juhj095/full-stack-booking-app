const { executeSQL } = require("./connection");

const findUser = (username) => {
    const query = "SELECT * FROM Customer WHERE name=?";
    return executeSQL(query, [username]);
}

const addUser = (username, password) => {
    const query = "INSERT INTO Customer (name, password) VALUES (?,?)";
    return executeSQL(query, [username, password]);
}

const getAllBookingsByUser = (username) => {
    const query = "SELECT * FROM Booking WHERE Customer_id=(SELECT id FROM Customer WHERE name=?)";
    return executeSQL(query, [username]);
}

const addBooking = (time, facilityId, customerId) => {
    const query = "INSERT INTO Booking (time, Facility_id, Customer_id) VALUES (?,?,?)";
    return executeSQL(query, [time, facilityId, customerId]);
}

module.exports = { findUser, addUser, getAllBookingsByUser, addBooking };