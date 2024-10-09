import { FlashcardCollection } from "../models/FlashcardCollectionModel"

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
        throw new Error('Error creating flashcard collection');
    }
};

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

export const updateCollectionDetails = async (
    collectionId: string,
    name: string,
    category: string,
) => {
    try {
        const updatedCollection = await FlashcardCollection.findByIdAndUpdate(
            collectionId,
            { name, category },
            { new: true }
        );
        if (!updatedCollection) {
            throw new Error('Collection not found');
        }
        return updatedCollection;
    } catch (error) {
        throw new Error('Error updating collection');
    }
};

export const deleteCollectionById = async (collectionId: string) => {
    try {
        const deletedCollection = await FlashcardCollection.findByIdAndDelete(collectionId);
        if (!deletedCollection) {
            throw new Error('Collection not found');
        }
        return deletedCollection;
    } catch (error) {
        throw new Error('Error deleting collection');
    }
};