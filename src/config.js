import dotenv from "dotenv";

dotenv.config({ });

export default {
    MONGO_URI : process.env.MONGO_URI,
    SECRET_KEY_JWT : process.env.SECRET_KEY_JWT,
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET, 
    GITHUB_CLIENT_SECRET : process.env.GITHUB_CLIENT_SECRET
};
