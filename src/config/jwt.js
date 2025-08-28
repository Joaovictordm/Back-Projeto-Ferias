import "dotenv/config.js";

export const jwt_secret = process.env.JWT_SECRET;
export const jwt_expires_in = process.env.JWT_EXPIRES_IN;