import { Router } from "express";
import {
  createNewCollectionController,
  deleteCollectionController,
  getAllCollectionsController,
  getCollectionController,
  updateCollectionController,
} from "../controllers/CollectionController";

const router = Router();

// Collection routes
router.post("/", createNewCollectionController);
router.get("/", getAllCollectionsController);
router.get("/:id", getCollectionController);
router.put("/:id", updateCollectionController);
router.delete("/:id", deleteCollectionController);

export default router;
