"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Användare med denna e-postadress finns redan' });
        }
        const newUser = await userModel_1.default.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const users = await userModel_1.default.find().select('-password');
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};
exports.getUsers = getUsers;
