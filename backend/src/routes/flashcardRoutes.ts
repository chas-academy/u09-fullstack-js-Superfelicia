import { Router } from "express";
import {
  addFlashcard,
  updateFlashcardStatus,
  deleteFlashcard, // Lägg till för att radera ett flashcard
} from "../controllers/FlashcardController";

const router = Router();

// flashcard routes
router.post("/collections/:id/flashcards", addFlashcard);

router.put(
  "/collections/:collectionId/flashcards/:flashcardId",
  updateFlashcardStatus
);

router.delete(
  "/collections/:collectionId/flashcards/:flashcardId",
  deleteFlashcard
);

export default router;
