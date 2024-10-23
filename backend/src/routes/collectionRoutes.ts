import { Router } from "express";
import {
  createNewCollectionController,
  deleteCollectionController,
  getAllCollectionsController,
  getCollectionController,
  getFlashcardsByCollectionController,
  updateCollectionController,
} from "../controllers/CollectionController";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Collection routes
router.post("/", authMiddleware, roleMiddleware('admin'), createNewCollectionController);
router.get("/", authMiddleware, getAllCollectionsController);
router.get("/:id", authMiddleware, getCollectionController);
router.get("/:collectionId/flashcards", authMiddleware, getFlashcardsByCollectionController)
router.put("/:id", authMiddleware, roleMiddleware('admin'), updateCollectionController);
router.delete("/:id", authMiddleware, roleMiddleware('admin'), deleteCollectionController);

export default router;
