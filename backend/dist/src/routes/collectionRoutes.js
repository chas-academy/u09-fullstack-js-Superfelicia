"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CollectionController_1 = require("../controllers/CollectionController");
const router = (0, express_1.Router)();
// Collection routes
router.post("/", CollectionController_1.createNewCollectionController);
router.get("/", CollectionController_1.getAllCollectionsController);
router.get("/:id", CollectionController_1.getCollectionController);
router.get("/:collectionId/flashcards", CollectionController_1.getFlashcardsByCollectionController);
router.put("/:id", CollectionController_1.updateCollectionController);
router.delete("/:id", CollectionController_1.deleteCollectionController);
exports.default = router;
