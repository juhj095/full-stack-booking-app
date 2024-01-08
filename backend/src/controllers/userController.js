var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const sql = require("../db/userSQL");
var dotenv = require("dotenv").config();

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.sendStatus(400);

        const duplicateUser = await sql.findUser(username);
        if (duplicateUser.length > 0) return res.sendStatus(409);

        const passwordHash = await bcrypt.hash(password, 10);
        const result = await sql.addUser(username, passwordHash);
        
        jwt.sign(
            { id: result.insertId, user: username, time: Date.now() },
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            (err, token) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).json({ token });
            });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await sql.findUser(username);
        if (user.length === 0) return res.sendStatus(401);

        const isCorrect = await bcrypt.compare(password, user[0]["password"]);
        if (!isCorrect) return res.sendStatus(401);

        jwt.sign(
            { id: user[0]["id"], user: username, time: Date.now() },
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            (err, token) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).json({ token });
            });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getAllBookingsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        // TODO: check the user
        const bookings = await sql.getAllBookingsByUser(id);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const addBooking = async (req, res) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) return res.sendStatus(401);
    
        const token = authorization.split(" ")[1];
        
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.sendStatus(401);
            
            const { userId, time, facilityId } = req.body;
            const { id } = decoded;
            if (id !== userId) return res.sendStatus(401);

            if (!userId || !time || !facilityId) return res.sendStatus(400);

            const date = new Date(time);
            if (!(date instanceof Date) || isNaN(date)) return res.sendStatus(400);

            await sql.addBooking(new Date(time), facilityId, userId);
            res.sendStatus(201);
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//TODO: delete booking

module.exports = { signup, login, getAllBookingsByUser, addBooking };