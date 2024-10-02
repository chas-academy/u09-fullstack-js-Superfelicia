"use strict";
// userController ansvarar för att hantera HTTP-förfrågningar
// och skicka svar tillbaka till klienten.
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.getUsersController = void 0;
const UserService_1 = require("../services/UserService");
const validRoles = ["user", "admin", "superadmin"];
// get all
const getUsersController = async (req, res) => {
    try {
        const users = await (0, UserService_1.getAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};
exports.getUsersController = getUsersController;
// update
const updateUserController = async (req, res) => {
    const { name, email, roles } = req.body;
    const { id } = req.params;
    console.log(req.body);
    const rolesArray = Array.isArray(roles) ? roles : [roles];
    if (rolesArray &&
        !rolesArray.every((role) => validRoles.includes(role))) {
        return res.status(400).json({ message: "Invalid role" });
    }
    try {
        // Hitta och uppdatera användaren baserat på _id
        const updatedUser = await (0, UserService_1.updateUser)(id, name, email, roles);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        // vi får tillbaka det uppdaterade json-objektet
        res.status(200).json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            roles: updatedUser.roles,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};
exports.updateUserController = updateUserController;
// delete
const deleteUserController = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const deletedUser = await (0, UserService_1.deleteUser)(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found " });
        }
        console.log("User deleted successfully", deletedUser);
        res.status(200).json({ message: "User deleted successfully: ", id });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
exports.deleteUserController = deleteUserController;
