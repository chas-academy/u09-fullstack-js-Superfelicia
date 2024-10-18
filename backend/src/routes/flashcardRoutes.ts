import { Router } from "express";
import {
  addFlashcardController, deleteFlashcardController, updateFlashcardController, updateFlashcardStatusController,
} from "../controllers/FlashcardController";

const router = Router();

// flashcard routes
router.post("/:collectionId/flashcards", addFlashcardController);

router.put(
  "/:collectionId/flashcards/:flashcardId",
  updateFlashcardController
);

// router.put(
//   "/:collectionId/flashcards/:id/status",
//   updateFlashcardStatusController
// );

router.delete(
  "/:collectionId/flashcards/:flashcardId",
  deleteFlashcardController
);

export default router;
