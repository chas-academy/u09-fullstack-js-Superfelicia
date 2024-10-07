import { Router } from "express";
import {
  createNewFlashcardCollection,
  getFlashcardCollection,
  getAllFlashcardCollections, // Lägg till för att hämta alla samlingar
  addFlashcard,
  updateFlashcardStatus,
  deleteFlashcard, // Lägg till för att radera ett flashcard
} from "../controllers/FlashcardCollectionController";

const router = Router();

// Route för att skapa en ny flashcard-samling
router.post("/collections", createNewFlashcardCollection);

// Route för att hämta alla samlingar
router.get("/collections", getAllFlashcardCollections); // Lägg till denna

// Route för att hämta en specifik samling med alla flashcards
router.get("/collections/:id", getFlashcardCollection);

// Route för att lägga till ett flashcard i en specifik samling
router.post("/collections/:id/flashcards", addFlashcard);

// Route för att uppdatera ett flashcards status i en specifik samling
router.put(
  "/collections/:collectionId/flashcards/:flashcardId",
  updateFlashcardStatus
);

// Route för att radera ett flashcard från en specifik samling
router.delete(
  "/collections/:collectionId/flashcards/:flashcardId",
  deleteFlashcard
); // Lägg till denna

export default router;
