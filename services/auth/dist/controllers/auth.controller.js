import { sql } from "../utils/db.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/tryCatch.js";
export const registerUser = TryCatch(async (req, res, next) => {
    const { name, password, phoneNumber, role, bio, email } = req.body;
    if (!name || !password || !phoneNumber || !role || !email) {
        throw new ErrorHandler(400, "All fields are required!");
    }
    const exisitingUser = await sql `SELECT user_id FROM users WHERE email =${email}`;
    //returns array so length
    if (exisitingUser.length > 0) {
        throw new ErrorHandler(409, "User with this email already exists!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let regsiteredUser;
    if (role === "recruiter") {
        const [user] = await sql `INSERT INTO users (name ,email ,password ,phone_number ,role) VALUES (${name}, ${email}, ${hashedPassword}, ${phoneNumber}, ${role}) RETURNING user_id, name, email, phone_number, role, created_at`;
        regsiteredUser = user;
    }
    else if (role == "jobseeker") {
        // const file = req.file
        const [user] = await sql `INSERT INTO users (name ,email ,password ,phone_number ,role, bio) VALUES (${name}, ${email}, ${hashedPassword}, ${phoneNumber}, ${role}, ${bio}) RETURNING user_id, name, email, phone_number, role, bio, created_at`;
    }
    res.json(email);
});
