"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const PasswordController_1 = require("../controllers/PasswordController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const CollectionController_1 = require("../controllers/CollectionController");
const router = (0, express_1.Router)();
// POST & GET /api/users
// Admin permission
router.get("/users", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), UserController_1.getUsersController);
router.put("/user/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), UserController_1.updateUserController);
router.delete("/user/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), UserController_1.deleteUserController);
router.post("/users/:userId/collections/:collectionId", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), CollectionController_1.addCollectionToUserController);
// Hämta collections
router.get("/users/:userId/collections", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("user"), CollectionController_1.getUserCollectionsController);
router.get("/users/:userId/collections/:collectionId", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("user"), CollectionController_1.getUserCollectionController);
// route för att uppdatera lösenordet
router.put("/user/:id/update-password", authMiddleware_1.authMiddleware, PasswordController_1.updateUserPasswordController);
// route för att reset lösenordet, måste ha token och email-länk..... etc.
router.put("/user/:id/reset-password", authMiddleware_1.authMiddleware, PasswordController_1.resetUserPasswordController);
// route för begära länk för lösenordsåterställning
router.post("/user/request-reset-password", PasswordController_1.requestPasswordResetController);
router.put("/user/reset-password/:token", PasswordController_1.resetPasswordController);
exports.default = router;
