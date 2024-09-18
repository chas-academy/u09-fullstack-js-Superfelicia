import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUsersController,
  resetUserPasswordController,
  updateUserController,
  updateUserPasswordController,
} from "../controllers/userController";

const router = Router();

// POST & GET /api/users
router.post("/user", createUserController);
router.get("/users", getUsersController);
router.put("/user/:id", updateUserController);
router.delete("/user/:id", deleteUserController);

// route för att uppdatera lösenordet
router.put('/user/:id/update-password', updateUserPasswordController);
// route för att reset lösenordet, måste ha token och email-länk..... etc.
router.put('/user/:id/reset-password', resetUserPasswordController);

export default router;
