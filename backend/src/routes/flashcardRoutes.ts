import { Router } from "express";
import {
  addFlashcardController, deleteFlashcardController, updateFlashcardController, updateFlashcardStatusController,
} from "../controllers/FlashcardController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = Router();

// flashcard routes
router.post("/:collectionId/flashcards", authMiddleware, roleMiddleware('admin'), addFlashcardController);

router.put(
  "/:collectionId/flashcards/:flashcardId", authMiddleware, roleMiddleware('admin'),
  updateFlashcardController
);

// router.put(
//   "/:collectionId/flashcards/:id/status",
//   updateFlashcardStatusController
// );

router.delete(
  "/:collectionId/flashcards/:flashcardId", authMiddleware, roleMiddleware('admin'),
  deleteFlashcardController
);

export default router;
