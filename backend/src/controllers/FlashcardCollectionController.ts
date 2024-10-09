import { Request, Response } from 'express';
import { 
  createFlashcardCollection, 
  getFlashcardCollectionById, 
  getAllCollections,  // Lägg till denna för att hämta alla samlingar
  addFlashcardToCollection, 
  updateFlashcardStatusInCollection, 
  removeFlashcardFromCollection  // Lägg till denna för att radera ett flashcard
} from '../services/flashcardCollectionService';

export const createNewFlashcardCollection = async (req: Request, res: Response) => {
  const { name, category, flashcards } = req.body;
  try {
    const newCollection = await createFlashcardCollection(name, category, flashcards);
    res.status(201).json(newCollection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllFlashcardCollections = async (req: Request, res: Response) => {
  try {
    const collections = await getAllCollections();
    res.json(collections);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getFlashcardCollection = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const collection = await getFlashcardCollectionById(id);
    res.json(collection);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const addFlashcard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    const updatedCollection = await addFlashcardToCollection(id, question, answer);
    res.status(201).json(updatedCollection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFlashcardStatus = async (req: Request, res: Response) => {
  const { collectionId, flashcardId } = req.params;
  const { mastered } = req.body;
  try {
    const updatedCollection = await updateFlashcardStatusInCollection(collectionId, flashcardId, mastered);
    res.json(updatedCollection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFlashcard = async (req: Request, res: Response) => {
  const { collectionId, flashcardId } = req.params;
  try {
    const updatedCollection = await removeFlashcardFromCollection(collectionId, flashcardId);  // Service-funktion för att radera flashcard
    res.json(updatedCollection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
