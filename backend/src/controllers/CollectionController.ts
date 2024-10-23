import { Request, Response } from "express";
import {
  createCollection,
  deleteCollectionById,
  getAllCollections,
  getCollectionById,
  updateCollectionDetails,
  addCollectionToUser,
  getUserCollections,
  getUserCollectionById,
  getFlashcardsByCollection,
} from "../services/collectionService";

export const createNewCollectionController = async (
  req: Request,
  res: Response
) => {
  const { name, category, flashcards, deadline, infoText } = req.body;

  if (!name || !category) {
    return res.status(400).json({ message: "Name and category are required" });
  }

  try {
    const newCollection = await createCollection(
      name,
      category,
      flashcards,
      deadline,
      infoText
    );
    res.status(201).json(newCollection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCollectionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const collections = await getAllCollections();
    res.json(collections);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCollectionController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const collection = await getCollectionById(id);
    res.json(collection);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getFlashcardsByCollectionController = async (
  req: Request,
  res: Response
) => {
  const { collectionId } = req.params;

  try {
    const flashcards = await getFlashcardsByCollection(collectionId);

    if (!flashcards) {
      return res
        .status(404)
        .json({ message: "Flashcards not found for this collection" });
    }

    if (!Array.isArray(flashcards) || flashcards.length === 0) {
      return res
        .status(404)
        .json({ message: "No flashcards found for this collection" });
    }

    res.status(200).json(flashcards);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCollectionController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { name, category, progress, status, deadline } = req.body;
  try {
    const updatedCollection = await updateCollectionDetails(
      id,
      name,
      category,
      progress,
      status,
      deadline
    );
    res.json(updatedCollection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCollectionController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    await deleteCollectionById(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// collections and users:
export const addCollectionToUserController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;
  const { collectionIds } = req.body;

  try {
    const updatedUser = await addCollectionToUser(userId, collectionIds);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserCollectionsController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;
  try {
    const collections = await getUserCollections(userId);
    res.status(200).json(collections);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserCollectionController = async (
  req: Request,
  res: Response
) => {
  const { userId, collectionId } = req.params;
  try {
    const collection = await getUserCollectionById(userId, collectionId);
    res.status(200).json(collection);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
