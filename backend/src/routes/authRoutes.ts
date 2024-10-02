import express from "express";
import { login, registerUserController } from "../controllers/AuthController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

// oskyddade rutter - alla kan logga in eller registrera sig
router.post("/login", login);
router.post("/user", registerUserController);

// skyddade rutter
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to the user dashboard",
    user: (req as any).user,
  });
});

router.get(
  "/admin-dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      message: "Welcome to the admin dashboard",
      user: (req as any).user,
    });
  }
);

export default router;
