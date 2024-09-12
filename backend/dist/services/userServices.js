"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const findUserByEmail = async (email) => {
    return await userModel_1.default.findOne({ email });
};
exports.findUserByEmail = findUserByEmail;
