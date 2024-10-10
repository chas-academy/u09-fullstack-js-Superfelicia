import { Request, Response } from "express";
import { addFlashcard, removeFlashcard, updateFlashcard, updateFlashcardStatus } from "../services/flashcardService";

export const addFlashcardController = async (req: Request, res: Response) => {
  const { collectionId } = req.params;
  const { question, answer } = req.body;
  try {
    const updatedCollection = await addFlashcard(
      collectionId,
      question,
      answer
    );
    res.status(201).json(updatedCollection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFlashcardController = async (req: Request, res: Response) => {
    console.log(req.body)
    const { collectionId, flashcardId } = req.params;
    const { question, answer, mastered, failedAttempts } = req.body;

    try {
        const updatedFlashcard = await updateFlashcard(
            collectionId,
            flashcardId,
            question,
            answer,
            mastered,
            failedAttempts
        );
        res.status(200).json(updatedFlashcard);
    } catch (error) {
        res.status(500).json({ message: 'Error updating flashcard', error});
    }
}

export const updateFlashcardStatusController = async (req: Request, res: Response) => {
  const { collectionId, flashcardId } = req.params;
  const { mastered } = req.body;
  try {
    const updatedCollection = await updateFlashcardStatus(
      collectionId,
      flashcardId,
      mastered
    );
    res.json(updatedCollection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFlashcardController = async (req: Request, res: Response) => {
  const { collectionId, flashcardId } = req.params;
  try {
    const updatedCollection = await removeFlashcard(
      collectionId,
      flashcardId
    );
    res.json(updatedCollection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
