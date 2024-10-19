"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCollectionController = exports.getUserCollectionsController = exports.addCollectionToUserController = exports.deleteCollectionController = exports.updateCollectionController = exports.getFlashcardsByCollectionController = exports.getCollectionController = exports.getAllCollectionsController = exports.createNewCollectionController = void 0;
const collectionService_1 = require("../services/collectionService");
const createNewCollectionController = async (req, res) => {
    const { name, category, flashcards, deadline, infoText } = req.body;
    try {
        const newCollection = await (0, collectionService_1.createCollection)(name, category, flashcards, deadline, infoText);
        res.status(201).json(newCollection);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createNewCollectionController = createNewCollectionController;
const getAllCollectionsController = async (req, res) => {
    try {
        const collections = await (0, collectionService_1.getAllCollections)();
        res.json(collections);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllCollectionsController = getAllCollectionsController;
const getCollectionController = async (req, res) => {
    const { id } = req.params;
    try {
        const collection = await (0, collectionService_1.getCollectionById)(id);
        res.json(collection);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getCollectionController = getCollectionController;
const getFlashcardsByCollectionController = async (req, res) => {
    const { collectionId } = req.params;
    try {
        const flashcards = await (0, collectionService_1.getFlashcardsByCollection)(collectionId);
        if (!flashcards || flashcards.length === 0) {
            return res
                .status(404)
                .json({ message: "No flashcards found for this collection" });
        }
        res.status(200).json(flashcards);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getFlashcardsByCollectionController = getFlashcardsByCollectionController;
const updateCollectionController = async (req, res) => {
    const { id } = req.params;
    const { name, category, progress, status, deadline } = req.body;
    try {
        const updatedCollection = await (0, collectionService_1.updateCollectionDetails)(id, name, category, progress, status, deadline);
        res.json(updatedCollection);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateCollectionController = updateCollectionController;
const deleteCollectionController = async (req, res) => {
    const { id } = req.params;
    try {
        await (0, collectionService_1.deleteCollectionById)(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteCollectionController = deleteCollectionController;
// collections and users:
const addCollectionToUserController = async (req, res) => {
    const { userId, collectionId } = req.params;
    try {
        const updatedUser = await (0, collectionService_1.addCollectionToUser)(userId, collectionId);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addCollectionToUserController = addCollectionToUserController;
const getUserCollectionsController = async (req, res) => {
    const { userId } = req.params;
    try {
        const collections = await (0, collectionService_1.getUserCollections)(userId);
        res.status(200).json(collections);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUserCollectionsController = getUserCollectionsController;
const getUserCollectionController = async (req, res) => {
    const { userId, collectionId } = req.params;
    try {
        const collection = await (0, collectionService_1.getUserCollectionById)(userId, collectionId);
        res.status(200).json(collection);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUserCollectionController = getUserCollectionController;
