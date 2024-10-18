"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCollectionById = exports.getUserCollections = exports.addCollectionToUser = exports.deleteCollectionById = exports.updateCollectionDetails = exports.getFlashcardsByCollection = exports.getCollectionById = exports.getAllCollections = exports.createCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FlashcardCollectionModel_1 = require("../models/FlashcardCollectionModel");
const tempUserModel_1 = __importDefault(require("../models/tempUserModel"));
const createCollection = async (name, category, flashcards, deadline, infoText) => {
    const newCollection = new FlashcardCollectionModel_1.FlashcardCollection({
        name,
        category,
        flashcards: flashcards.length ? flashcards : [],
        progress: 0,
        status: "not started",
        deadline: deadline || null,
        infoText: infoText || "",
    });
    try {
        return await newCollection.save();
    }
    catch (error) {
        throw new Error("Error creating flashcard collection");
    }
};
exports.createCollection = createCollection;
const getAllCollections = async () => {
    try {
        return await FlashcardCollectionModel_1.FlashcardCollection.find();
    }
    catch (error) {
        throw new Error("Error fetching all collections");
    }
};
exports.getAllCollections = getAllCollections;
const getCollectionById = async (collectionId) => {
    try {
        const collection = await FlashcardCollectionModel_1.FlashcardCollection.findById(collectionId).populate("flashcards");
        if (!collection) {
            throw new Error("Collection not found");
        }
        return collection;
    }
    catch (error) {
        throw new Error("Error fetching collection");
    }
};
exports.getCollectionById = getCollectionById;
const getFlashcardsByCollection = async (collectionId) => {
    try {
        const collection = await FlashcardCollectionModel_1.FlashcardCollection.findById(collectionId).populate("flashcards");
        if (!collection) {
            throw new Error("Collection not found");
        }
        return collection.flashcards;
    }
    catch (error) {
        throw new Error("Error fetching flashcards from collection: ", error.message);
    }
};
exports.getFlashcardsByCollection = getFlashcardsByCollection;
const updateCollectionDetails = async (collectionId, name, category, progress, status, deadline) => {
    try {
        const updatedCollection = await FlashcardCollectionModel_1.FlashcardCollection.findByIdAndUpdate(collectionId, { name, category, progress, status, deadline }, { new: true });
        if (!updatedCollection) {
            throw new Error("Collection not found");
        }
        return updatedCollection;
    }
    catch (error) {
        throw new Error("Error updating collection");
    }
};
exports.updateCollectionDetails = updateCollectionDetails;
const deleteCollectionById = async (collectionId) => {
    try {
        const deletedCollection = await FlashcardCollectionModel_1.FlashcardCollection.findByIdAndDelete(collectionId);
        if (!deletedCollection) {
            throw new Error("Collection not found");
        }
        return deletedCollection;
    }
    catch (error) {
        throw new Error("Error deleting collection");
    }
};
exports.deleteCollectionById = deleteCollectionById;
// collections and users:
const addCollectionToUser = async (userId, collectionId) => {
    try {
        const user = await tempUserModel_1.default.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const collectionObjectId = new mongoose_1.default.Types.ObjectId(collectionId);
        const collection = await FlashcardCollectionModel_1.FlashcardCollection.findById(collectionObjectId);
        if (!collection) {
            throw new Error("Collection not found");
        }
        if (user.collections?.includes(collectionObjectId)) {
            throw new Error("Collection already added to this user");
        }
        user.collections?.push(collectionObjectId);
        await user.save();
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.addCollectionToUser = addCollectionToUser;
const getUserCollections = async (userId) => {
    try {
        const user = await tempUserModel_1.default.findById(userId).populate("collections");
        if (!user) {
            throw new Error("User not found");
        }
        const allCollections = user.collections;
        const currentCollections = allCollections.filter((collection) => collection instanceof FlashcardCollectionModel_1.FlashcardCollection &&
            collection.status === "in progress");
        const completedCollections = allCollections.filter((collection) => collection instanceof FlashcardCollectionModel_1.FlashcardCollection &&
            collection.status === "completed");
        const upcomingCollections = allCollections.filter((collection) => collection instanceof FlashcardCollectionModel_1.FlashcardCollection &&
            collection.status === "not started");
        return { currentCollections, completedCollections, upcomingCollections };
    }
    catch (error) {
        throw new Error("Error fetching user collections");
    }
};
exports.getUserCollections = getUserCollections;
const getUserCollectionById = async (userId, collectionId) => {
    try {
        const user = await tempUserModel_1.default.findById(userId).populate({
            path: "collections",
            match: { _id: collectionId },
            options: { lean: true },
        });
        if (!user || !user.collections.length) {
            throw new Error("Collection not found for this user");
        }
        const collections = user.collections;
        const collection = collections[0];
        return collection;
    }
    catch (error) {
        throw new Error("Error fetching user collection");
    }
};
exports.getUserCollectionById = getUserCollectionById;
