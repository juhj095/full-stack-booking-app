const { executeSQL } = require("./connection");

const findUser = (username) => {
    const query = "SELECT * FROM Customer WHERE name=?";
    return executeSQL(query, [username]);
}

const addUser = (username, password) => {
    const query = "INSERT INTO Customer (name, password) VALUES (?,?)";
    return executeSQL(query, [username, password]);
}

const getAllBookingsByUser = (id) => {
    const query = "SELECT b.id, b.time, f.name AS facilityName, f.address FROM Booking b LEFT JOIN Facility f ON f.id = b.Facility_id WHERE b.Customer_id=?";
    return executeSQL(query, [id]);
}

const addBooking = (time, facilityId, customerId) => {
    const query = "INSERT INTO Booking (time, Facility_id, Customer_id) VALUES (?,?,?)";
    return executeSQL(query, [time, facilityId, customerId]);
}

const deleteBooking = (bookingId) => {
    const query = "DELETE FROM Booking WHERE id=?"
    return executeSQL(query, [bookingId]);
}

module.exports = { findUser, addUser, getAllBookingsByUser, addBooking, deleteBooking };