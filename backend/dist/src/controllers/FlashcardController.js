"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFlashcardController = exports.updateFlashcardStatusController = exports.updateFlashcardController = exports.addFlashcardController = void 0;
const flashcardService_1 = require("../services/flashcardService");
const addFlashcardController = async (req, res) => {
    const { collectionId } = req.params;
    const { question, answer } = req.body;
    try {
        const updatedCollection = await (0, flashcardService_1.addFlashcard)(collectionId, question, answer);
        res.status(201).json(updatedCollection);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addFlashcardController = addFlashcardController;
const updateFlashcardController = async (req, res) => {
    console.log(req.body);
    const { collectionId, flashcardId } = req.params;
    const { question, answer, mastered, failedAttempts } = req.body;
    try {
        const updatedFlashcard = await (0, flashcardService_1.updateFlashcard)(collectionId, flashcardId, question, answer, mastered, failedAttempts);
        res.status(200).json(updatedFlashcard);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating flashcard', error });
    }
};
exports.updateFlashcardController = updateFlashcardController;
const updateFlashcardStatusController = async (req, res) => {
    const { collectionId, flashcardId } = req.params;
    const { mastered } = req.body;
    try {
        const updatedCollection = await (0, flashcardService_1.updateFlashcardStatus)(collectionId, flashcardId, mastered);
        res.json(updatedCollection);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateFlashcardStatusController = updateFlashcardStatusController;
const deleteFlashcardController = async (req, res) => {
    const { collectionId, flashcardId } = req.params;
    try {
        const updatedCollection = await (0, flashcardService_1.removeFlashcard)(collectionId, flashcardId);
        res.json(updatedCollection);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteFlashcardController = deleteFlashcardController;
