"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FlashcardController_1 = require("../controllers/FlashcardController");
const router = (0, express_1.Router)();
// flashcard routes
router.post("/:collectionId/flashcards", FlashcardController_1.addFlashcardController);
router.put("/:collectionId/flashcards/:flashcardId", FlashcardController_1.updateFlashcardController);
// router.put(
//   "/:collectionId/flashcards/:id/status",
//   updateFlashcardStatusController
// );
router.delete("/:collectionId/flashcards/:flashcardId", FlashcardController_1.deleteFlashcardController);
exports.default = router;
