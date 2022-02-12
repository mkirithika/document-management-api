import jsonwebtoken from "jsonwebtoken";
import * as crypto from "crypto";

export const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const hashPassword = (password, salt) => {
  return crypto.createHmac("sha512", salt).update(password).digest("hex");
};

// Generate JWT token
export const generateToken = (data) => {
  return jsonwebtoken.sign(
    { exp: Math.floor(Date.now() / 1000) + 60 * 60, data },
    "secretKey"
  );
};
