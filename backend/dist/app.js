"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Importera dina user routes
const db_1 = __importDefault(require("./config/db")); // Om du har en databasanslutning (t.ex. MongoDB)
const app = (0, express_1.default)();
// Middleware för att hantera JSON-body
app.use(express_1.default.json());
// Anslut till MongoDB om det behövs
(0, db_1.default)(); // Om du har en MongoDB-anslutning
// Routes
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
// Lägg till dina API-routes för användare
app.use("/api", userRoutes_1.default); // Gör att /api/users kan användas
exports.default = app;
