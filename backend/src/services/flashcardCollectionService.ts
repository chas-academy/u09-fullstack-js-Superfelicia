import mongoose from "mongoose";
import { FlashcardCollection } from "../models/FlashcardCollectionModel";

export const createFlashcardCollection = async (
  name: string,
  category: string,
  flashcards: any[]
) => {
  const newCollection = new FlashcardCollection({
    name,
    category,
    flashcards: flashcards.length ? flashcards : [],
  });

  try {
    return await newCollection.save();
  } catch (error) {
    throw new Error("Error creating flashcard collection");
  }
};

export const getAllCollections = async () => {
  try {
    return await FlashcardCollection.find();
  } catch (error) {
    throw new Error("Error fetching all collections");
  }
};

export const getFlashcardCollectionById = async (collectionId: string) => {
  try {
    const collection = await FlashcardCollection.findById(collectionId);
    if (!collection) {
      throw new Error("Collection not found");
    }
    return collection;
  } catch (error) {
    throw new Error("Error fetching collection");
  }
};

export const addFlashcardToCollection = async (
  collectionId: string,
  question: string,
  answer: string
) => {
  try {
    const collection = await FlashcardCollection.findById(collectionId);
    if (!collection) {
      throw new Error("Collection not found");
    }

    const newFlashcard = {
      _id: new mongoose.Types.ObjectId(),
      question,
      answer,
      mastered: false,
      failedAttempts: 0,
    };

    collection.flashcards.push(newFlashcard as any);

    return await collection.save();
  } catch (error) {
    throw new Error("Error adding flashcard to collection");
  }
};

export const updateFlashcardStatusInCollection = async (
  collectionId: string,
  flashcardId: string,
  mastered: boolean
) => {
  try {
    const collection = await FlashcardCollection.findById(collectionId);
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
  } catch (error) {
    throw new Error("Error updating flashcard status");
  }
};

export const removeFlashcardFromCollection = async (
  collectionId: string,
  flashcardId: string
) => {
  try {
    const collection = await FlashcardCollection.findById(collectionId);
    if (!collection) {
      throw new Error("Collection not found");
    }

    collection.flashcards.pull({ _id: flashcardId });

    return await collection.save();
  } catch (error) {
    throw new Error("Error removing flashcard from collection");
  }
};
