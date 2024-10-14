import mongoose, { Types } from "mongoose";
import { FlashcardCollection } from "../models/FlashcardCollectionModel";
import User from "../models/tempUserModel";

export const createCollection = async (
  name: string,
  category: string,
  flashcards: any[],
  deadline?: Date,
  infoText?: string
) => {
  const newCollection = new FlashcardCollection({
    name,
    category,
    flashcards: flashcards.length ? flashcards : [],
    progress: 0,
    status:  'not started',
    deadline: deadline || null,
    infoText: infoText || '',
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
  category: string,
  progress?: number,
  status?: 'not started' | 'in progress' | 'completed',
  deadline?: Date
) => {
  try {
    const updatedCollection = await FlashcardCollection.findByIdAndUpdate(
      collectionId,
      { name, category, progress, status, deadline },
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

// collections and users:
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

export const getUserCollections = async (userId: string) => {
  try {
    const user = await User.findById(userId).populate("collections");
    if (!user) {
      throw new Error("User not found");
    }

    const allCollections = user.collections as Types.Array<
      Types.ObjectId | typeof FlashcardCollection
    >;

    const currentCollections = allCollections.filter((collection: any) =>
    collection instanceof FlashcardCollection && 
    collection.status === 'in progress'
  );

  const completedCollections = allCollections.filter((collection: any) =>
    collection instanceof FlashcardCollection && 
    collection.status === 'completed'
  );

  const upcomingCollections = allCollections.filter((collection: any) =>
    collection instanceof FlashcardCollection && 
    collection.status === 'not started'
  );

    return { currentCollections, completedCollections, upcomingCollections };
  } catch (error: any) {
    throw new Error("Error fetching user collections");
  }
};

export const getUserCollectionById = async (
  userId: string,
  collectionId: string
) => {
  try {
    const user = await User.findById(userId).populate({
      path: "collections",
      match: { _id: collectionId },
      options: { lean: true },
    });

    if (!user || !user.collections.length) {
      throw new Error("Collection not found for this user");
    }

    const collections = user.collections as Types.Array<
      typeof FlashcardCollection
    >;

    const collection = collections[0];

    return collection;
  } catch (error: any) {
    throw new Error("Error fetching user collection");
  }
};
