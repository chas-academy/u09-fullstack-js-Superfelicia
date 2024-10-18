"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB = async () => {
    const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
    dotenv_1.default.config({ path: envFile });
    console.log("Attempting to connect to MongoDB with URI:", process.env.MONGO_URI);
    try {
        const dbUri = process.env.MONGO_URI;
        await mongoose_1.default.connect(dbUri);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        if (process.env.NODE_ENV !== "test") {
            process.exit(1);
        }
        else {
            throw new Error("MongoDB connection failed in test environment");
        }
    }
};
exports.default = connectDB;
