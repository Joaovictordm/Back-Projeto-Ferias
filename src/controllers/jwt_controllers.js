import jwt from "jsonwebtoken";
import {jwt_secret, jwt_expires_in } from "../config/jwt.js";

export function generateToken(payload){
    return jwt.sign(payload, jwt_secret, {expiresIn: jwt_expires_in});
}

export function verifyToken(token){
    try{
        return jwt.verify(token, jwt_secret)
    }catch(error){
        return null;
    }
}