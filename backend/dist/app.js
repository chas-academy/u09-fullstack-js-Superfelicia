"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const flashcardRoutes_1 = __importDefault(require("./routes/flashcardRoutes"));
const collectionRoutes_1 = __importDefault(require("./routes/collectionRoutes"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://flashlearn09.netlify.app",
    methods: "GET,POST,PUT,DELETE",
}));
app.use(express_1.default.json());
(0, db_1.default)();
// logga inkommande requests för felsökning/testning
app.use((req, res, next) => {
    console.log(`Request received at ${req.path}`);
    next();
});
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/api", userRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/collections", collectionRoutes_1.default);
app.use("/api/flashcards", flashcardRoutes_1.default);
exports.default = app;
