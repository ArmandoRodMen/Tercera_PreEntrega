import CustomError from "../errors/error.generator.js";
import { ErrorMessages } from "../errors/errors.enum.js";

//Session
export const createCookie = async (req, res) => {
    try {
        const { name, email } = req.body;
        // Validate that name and email are present
        if (!name || !email) {
            return res.status(400).send("Name and email are required.");
        }
        req.session.name = name;
        req.session.email = email;
        res.send("Session created successfully");
    } catch (error) {
        console.error("Error creating session:", error);
        //res.status(500).send("Internal Server Error");
        CustomError.generateError(
            ErrorMessages.INERNAL_ERROR,
            500,
            ErrorMessages.INERNAL_ERROR
        );
    }
};

export const viewCookie = async (req, res) => {
    console.log("Cookies:", req.cookies);
    res.send("View cookies");
};