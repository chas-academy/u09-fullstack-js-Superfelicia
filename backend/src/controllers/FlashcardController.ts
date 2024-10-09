import { Request, Response } from "express";
import {
  addFlashcardToCollection,
  updateFlashcardStatusInCollection,
  removeFlashcardFromCollection,
} from "../services/flashcardCollectionService";

export const addFlashcard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    const updatedCollection = await addFlashcardToCollection(
      id,
      question,
      answer
    );
    res.status(201).json(updatedCollection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFlashcardStatus = async (req: Request, res: Response) => {
  const { collectionId, flashcardId } = req.params;
  const { mastered } = req.body;
  try {
    const updatedCollection = await updateFlashcardStatusInCollection(
      collectionId,
      flashcardId,
      mastered
    );
    res.json(updatedCollection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFlashcard = async (req: Request, res: Response) => {
  const { collectionId, flashcardId } = req.params;
  try {
    const updatedCollection = await removeFlashcardFromCollection(
      collectionId,
      flashcardId
    ); // Service-funktion för att radera flashcard
    res.json(updatedCollection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
