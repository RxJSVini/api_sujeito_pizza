import dotenv from "dotenv";
dotenv.config({});

export default {
    expirenTime:'2H',
    secretKey:process.env.JWT_KEY
}