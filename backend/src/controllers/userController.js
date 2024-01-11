var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const sql = require("../db/userSQL");

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.sendStatus(400);

        const duplicateUser = await sql.findUser(username);
        if (duplicateUser.length > 0) return res.sendStatus(409);

        const passwordHash = await bcrypt.hash(password, 10);
        const result = await sql.addUser(username, passwordHash);
        
        const token = await signJWT(result.insertId, username);
        res.status(200).json({ token });
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

        const token = await signJWT(user[0]["id"], username);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getAllBookingsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const decodedId = req.user.id;
        // paramsId is string, userId is number
        if (id != decodedId) return res.sendStatus(401);
        const bookings = await sql.getAllBookingsByUser(id);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const addBooking = async (req, res) => {
    try {
        const { userId, time, facilityId } = req.body;
        if (!userId || !time || !facilityId) return res.sendStatus(400);

        const { id } = req.user;
        if (id !== userId) return res.sendStatus(401);

        const date = new Date(time);
        if (!(date instanceof Date) || isNaN(date)) return res.sendStatus(400);

        await sql.addBooking(new Date(time), facilityId, userId);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteBooking = async (req, res) => {
    try {
        const { bookingId, userId } = req.body;
        if (!bookingId || !userId) return res.sendStatus(400);

        const { id } = req.user;
        if (id !== userId) return res.sendStatus(401);
        
        await sql.deleteBooking(bookingId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const signJWT = (userId, username) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { id: userId, user: username, time: Date.now() },
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        )
    });
}

const verifyJWT = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) throw new Error();
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.sendStatus(401).json();
    }
};

module.exports = { signup, login, getAllBookingsByUser, addBooking, verifyJWT, deleteBooking };