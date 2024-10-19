"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardCollection = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Flashcard schema
const flashcardSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    mastered: { type: Boolean, default: false },
    failedAttempts: { type: Number, default: 0 },
});
// Flashcard collection schema
const flashcardCollectionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    flashcards: [flashcardSchema],
    progress: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["not started", "in progress", "completed"],
        default: "not started",
    },
    deadline: { type: Date, required: false },
    infoText: { type: String, required: false },
});
exports.FlashcardCollection = mongoose_1.default.model("FlashcardCollection", flashcardCollectionSchema);
