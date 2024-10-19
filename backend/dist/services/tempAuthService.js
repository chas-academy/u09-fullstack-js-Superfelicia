"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const tempUserModel_1 = __importDefault(require("../models/tempUserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = async (email, password) => {
    const user = await tempUserModel_1.default.findOne({ email });
    if (!user)
        throw new Error("User not found");
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid password");
    // generera JWT-token
    const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email, roles: user.roles }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
    });
    return {
        token,
        user: { id: user.id, name: user.name, email: user.email, roles: user.roles },
    };
};
exports.loginUser = loginUser;
const registerUser = async (name, email, password, roles) => {
    const rolesArray = Array.isArray(roles) ? roles : [roles];
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    const newUser = new tempUserModel_1.default({ name, email, password: hashedPassword, roles: rolesArray });
    try {
        return await newUser.save();
    }
    catch (error) {
        console.error("Error registering user:", error);
        throw new Error("User registration failed");
    }
};
exports.registerUser = registerUser;
// vi kan lägga till andra auth operations, som logout eller change of password etc.
