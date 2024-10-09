import { Request, Response } from 'express';
import { 
  createFlashcardCollection, 
  getFlashcardCollectionById, 
  getAllCollections,
} from '../services/flashcardCollectionService';
import { deleteCollectionById, updateCollectionDetails } from '../services/collectionService';

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

export const updateCollection = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category } = req.body;
  try {
    const updatedCollection = await updateCollectionDetails(id, name, category);
    res.json(updatedCollection)
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCollection = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteCollectionById(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
