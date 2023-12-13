const sql = require("../db/bookingSQL");

const getAllFacilities = async (req, res) => {
    try {
        const facilities = await sql.getAll();
        console.log(facilities);
        res.status(200).json(facilities);
    } catch (error) {
        res.status(400);
        res.json({message: "error"});
    }
}

module.exports = {getAllFacilities};