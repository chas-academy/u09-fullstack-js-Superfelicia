"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFlashcard = exports.updateFlashcardStatus = exports.updateFlashcard = exports.addFlashcard = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FlashcardCollectionModel_1 = require("../models/FlashcardCollectionModel");
const addFlashcard = async (collectionId, question, answer) => {
    try {
        const collection = await FlashcardCollectionModel_1.FlashcardCollection.findById(collectionId);
        if (!collection) {
            throw new Error("Collection not found");
        }
        const newFlashcard = {
            _id: new mongoose_1.default.Types.ObjectId(),
            question,
            answer,
            mastered: false,
            failedAttempts: 0,
        };
        collection.flashcards.push(newFlashcard);
        return await collection.save();
    }
    catch (error) {
        throw new Error("Error adding flashcard to collection", error.message);
    }
};
exports.addFlashcard = addFlashcard;
const updateFlashcard = async (collectionId, flashcardId, question, answer, mastered, failedAttempts) => {
    try {
        const collection = await FlashcardCollectionModel_1.FlashcardCollection.findById(collectionId);
        if (!collection) {
            throw new Error(`Collection not found with id: ${collectionId}`);
        }
        const flashcard = collection.flashcards.id(flashcardId);
        if (!flashcard) {
            throw new Error(`Flashcard not found with id: ${flashcardId}`);
        }
        flashcard.question = question;
        flashcard.answer = answer;
        flashcard.mastered = mastered;
        flashcard.failedAttempts = failedAttempts;
        return await collection.save();
    }
    catch (error) {
        throw new Error('Error updating flashcard:', error.message);
    }
};
exports.updateFlashcard = updateFlashcard;
const updateFlashcardStatus = async (collectionId, flashcardId, mastered) => {
    try {
        const collection = await FlashcardCollectionModel_1.FlashcardCollection.findById(collectionId);
        if (!collection) {
            throw new Error("Collection not found");
        }
        const flashcard = collection.flashcards.id(flashcardId);
        if (!flashcard) {
            throw new Error("Flashcard not found");
        }
        flashcard.mastered = mastered;
        if (!mastered) {
            flashcard.failedAttempts += 1;
        }
        return await collection.save();
    }
    catch (error) {
        throw new Error("Error updating flashcard status");
    }
};
exports.updateFlashcardStatus = updateFlashcardStatus;
const removeFlashcard = async (collectionId, flashcardId) => {
    try {
        const collection = await FlashcardCollectionModel_1.FlashcardCollection.findById(collectionId);
        if (!collection) {
            throw new Error("Collection not found");
        }
        collection.flashcards.pull({ _id: flashcardId });
        return await collection.save();
    }
    catch (error) {
        throw new Error("Error removing flashcard from collection");
    }
};
exports.removeFlashcard = removeFlashcard;
