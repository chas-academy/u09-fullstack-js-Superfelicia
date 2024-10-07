import mongoose from 'mongoose';
import { FlashcardCollection } from '../models/FlashcardCollectionModel';

// Skapa en ny flashcard-samling
export const createFlashcardCollection = async (name: string, category: string, flashcards: any[]) => {
  const newCollection = new FlashcardCollection({
    name,
    category,
    flashcards,
  });

  try {
    return await newCollection.save();
  } catch (error) {
    throw new Error('Error creating flashcard collection');
  }
};

// Hämta alla flashcard-samlingar
export const getAllCollections = async () => {
  try {
    return await FlashcardCollection.find();  // Hämta alla samlingar
  } catch (error) {
    throw new Error('Error fetching all collections');
  }
};

// Hämta en specifik flashcard-samling med ID
export const getFlashcardCollectionById = async (collectionId: string) => {
  try {
    const collection = await FlashcardCollection.findById(collectionId);
    if (!collection) {
      throw new Error('Collection not found');
    }
    return collection;
  } catch (error) {
    throw new Error('Error fetching collection');
  }
};

// Lägg till ett flashcard i en samling
export const addFlashcardToCollection = async (collectionId: string, question: string, answer: string) => {
  try {
    const collection = await FlashcardCollection.findById(collectionId);
    if (!collection) {
      throw new Error('Collection not found');
    }

    // Skapa ett nytt flashcard med ett genererat _id
    const newFlashcard = {
      _id: new mongoose.Types.ObjectId(),  // Skapa ett nytt unikt ID
      question,
      answer,
      mastered: false,
      failedAttempts: 0,
    };

    // Lägg till flashcard i samlingen
    collection.flashcards.push(newFlashcard as any);  // Ange `as any` för att undvika typkonflikter

    // Spara den uppdaterade samlingen
    return await collection.save();
  } catch (error) {
    throw new Error('Error adding flashcard to collection');
  }
};

// Uppdatera ett flashcards status inom en samling
export const updateFlashcardStatusInCollection = async (collectionId: string, flashcardId: string, mastered: boolean) => {
  try {
    const collection = await FlashcardCollection.findById(collectionId);
    if (!collection) {
      throw new Error('Collection not found');
    }

    // Leta upp flashcard inom samlingen med hjälp av _id
    const flashcard = collection.flashcards.id(flashcardId);  // Nu borde id() fungera korrekt
    if (!flashcard) {
      throw new Error('Flashcard not found');
    }

    // Uppdatera flashcardets status
    flashcard.mastered = mastered;
    if (!mastered) {
      flashcard.failedAttempts += 1;
    }

    // Spara samlingen
    return await collection.save();
  } catch (error) {
    throw new Error('Error updating flashcard status');
  }
};

// Radera ett flashcard från en samling
export const removeFlashcardFromCollection = async (collectionId: string, flashcardId: string) => {
  try {
    const collection = await FlashcardCollection.findById(collectionId);
    if (!collection) {
      throw new Error('Collection not found');
    }

    // Använd pull för att ta bort flashcard med specifikt _id från flashcards array
    collection.flashcards.pull({ _id: flashcardId });

    // Spara den uppdaterade samlingen
    return await collection.save();
  } catch (error) {
    throw new Error('Error removing flashcard from collection');
  }
};
