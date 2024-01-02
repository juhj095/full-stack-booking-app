var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const sql = require("../db/bookingSQL");
var dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const duplicateUser = await sql.findUser(username);
        if (duplicateUser.length > 0) res.sendStatus(409);

        const passwordHash = await bcrypt.hash(password, 10);
        const result = await sql.addUser(username, passwordHash);
        
        jwt.sign({
            id: result.insertId, user: username, time: Date.now()},
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
        if (isCorrect) {
            jwt.sign({
                id: user[0]["id"], user: username, time: Date.now()},
                process.env.JWT_SECRET,
                { expiresIn: "2h" },
                (err, token) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(200).json({ token });
                });
        }
        else res.sendStatus(401);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getAllBookingsByUser = async (req, res) => {
    try {
        const { username } = req.params;
        // TODO: check the user
        const bookings = await sql.getAllBookingsByUser(username);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { signup, login, getAllBookingsByUser };