import mongoose from "mongoose";
import { FlashcardCollection } from "../models/FlashcardCollectionModel";

export const addFlashcard = async (
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

    collection.flashcards.push(newFlashcard);

    return await collection.save();
  } catch (error: any) {
    throw new Error("Error adding flashcard to collection", error.message);
  }
};

export const updateFlashcard = async (collectionId: string, flashcardId: string, question: string, answer: string, mastered: boolean, failedAttempts: number) => {
  try {
    const collection = await FlashcardCollection.findById(collectionId);
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
  } catch (error: any) {
    throw new Error('Error updating flashcard:', error.message);
  }
};

export const updateFlashcardStatus = async (
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

export const removeFlashcard = async (
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
