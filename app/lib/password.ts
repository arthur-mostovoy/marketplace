import crypto from "crypto";

export function hashPassword(password: string) {
    const salt = process.env.PASSWORD_SALT;
    if (!salt) throw new Error("PASSWORD_SALT is not set");
    return crypto.createHash("sha256").update(password + salt).digest("hex");
}