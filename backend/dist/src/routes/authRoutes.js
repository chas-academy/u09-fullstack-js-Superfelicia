"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
// oskyddade rutter - alla kan logga in eller registrera sig
router.post("/login", AuthController_1.login);
router.post("/user", AuthController_1.registerUserController);
// skyddade rutter
router.get("/dashboard", authMiddleware_1.authMiddleware, (req, res) => {
    res.json({
        message: "Welcome to the user dashboard",
        user: req.user,
    });
});
router.get("/admin-dashboard", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), (req, res) => {
    res.json({
        message: "Welcome to the admin dashboard",
        user: req.user,
    });
});
exports.default = router;
