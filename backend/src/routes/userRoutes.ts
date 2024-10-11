import { Router } from "express";
import {
  deleteUserController,
  getUsersController,
  updateUserController,
} from "../controllers/UserController";
import {
  requestPasswordResetController,
  resetPasswordController,
  resetUserPasswordController,
  updateUserPasswordController,
} from "../controllers/PasswordController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { addCollectionToUserController } from "../controllers/CollectionController";

const router = Router();

// POST & GET /api/users
// Admin permission
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getUsersController
);
router.put(
  "/user/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserController
);
router.delete(
  "/user/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUserController
);

router.post('/users/:userId/collections/:collectionId',
authMiddleware, roleMiddleware('admin'), addCollectionToUserController)

// route för att uppdatera lösenordet
router.put(
  "/user/:id/update-password",
  authMiddleware,
  updateUserPasswordController
);
// route för att reset lösenordet, måste ha token och email-länk..... etc.
router.put(
  "/user/:id/reset-password",
  authMiddleware,
  resetUserPasswordController
);

// route för begära länk för lösenordsåterställning
router.post("/user/request-reset-password", requestPasswordResetController);
router.put("/user/reset-password/:token", resetPasswordController);

export default router;
