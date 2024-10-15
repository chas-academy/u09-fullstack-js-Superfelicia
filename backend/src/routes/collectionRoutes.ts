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
router.post("/", createNewCollectionController);
router.get("/", getAllCollectionsController);
router.get("/:id", getCollectionController);
router.get("/:collectionId/flashcards", getFlashcardsByCollectionController)
router.put("/:id", updateCollectionController);
router.delete("/:id", deleteCollectionController);

export default router;
