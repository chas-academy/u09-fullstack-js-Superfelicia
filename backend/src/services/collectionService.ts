import mongoose from "mongoose";
import { FlashcardCollection } from "../models/FlashcardCollectionModel";
import User from "../models/tempUserModel";

export const createCollection = async (
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

export const addCollectionToUser = async (
  userId: string,
  collectionId: string
) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const collectionObjectId = new mongoose.Types.ObjectId(collectionId);

    const collection = await FlashcardCollection.findById(collectionObjectId);
    if (!collection) {
      throw new Error("Collection not found");
    }

    if (user.collections?.includes(collectionObjectId)) {
      throw new Error("Collection already added to this user");
    }

    user.collections?.push(collectionObjectId);
    await user.save();

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllCollections = async () => {
  try {
    return await FlashcardCollection.find();
  } catch (error) {
    throw new Error("Error fetching all collections");
  }
};

export const getCollectionById = async (collectionId: string) => {
  try {
    const collection =
      await FlashcardCollection.findById(collectionId).populate("flashcards");
    if (!collection) {
      throw new Error("Collection not found");
    }
    return collection;
  } catch (error) {
    throw new Error("Error fetching collection");
  }
};

export const updateCollectionDetails = async (
  collectionId: string,
  name: string,
  category: string
) => {
  try {
    const updatedCollection = await FlashcardCollection.findByIdAndUpdate(
      collectionId,
      { name, category },
      { new: true }
    );
    if (!updatedCollection) {
      throw new Error("Collection not found");
    }
    return updatedCollection;
  } catch (error) {
    throw new Error("Error updating collection");
  }
};

export const deleteCollectionById = async (collectionId: string) => {
  try {
    const deletedCollection =
      await FlashcardCollection.findByIdAndDelete(collectionId);
    if (!deletedCollection) {
      throw new Error("Collection not found");
    }
    return deletedCollection;
  } catch (error) {
    throw new Error("Error deleting collection");
  }
};
