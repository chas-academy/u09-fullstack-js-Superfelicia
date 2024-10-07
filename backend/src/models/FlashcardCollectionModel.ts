import mongoose, { Document, Schema, Types } from 'mongoose';

// Flashcard interface
export interface IFlashcard extends Document {
  question: string;
  answer: string;
  mastered: boolean;
  failedAttempts: number;
}

// Flashcard schema
const flashcardSchema: Schema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  mastered: { type: Boolean, default: false },
  failedAttempts: { type: Number, default: 0 },
});

// Flashcard collection interface
export interface IFlashcardCollection extends Document {
  name: string;
  category: string;
  flashcards: Types.DocumentArray<IFlashcard>;  // Använd Types.DocumentArray för att hantera subdokument
}

// Flashcard collection schema
const flashcardCollectionSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  flashcards: [flashcardSchema],
});

export const FlashcardCollection = mongoose.model<IFlashcardCollection>('FlashcardCollection', flashcardCollectionSchema);
