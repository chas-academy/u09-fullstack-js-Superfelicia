"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = async (email, password) => {
    const user = await userModel_1.default.findOne({ email });
    if (!user)
        throw new Error("User not found");
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid password");
    // generera JWT-token
    const token = jsonwebtoken_1.default.sign({ id: user.id, roles: user.roles }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
    });
    return { token, user };
};
exports.loginUser = loginUser;
// vi kan lägga till andra auth operations, som logout eller change of password etc.
