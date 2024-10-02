// userController ansvarar för att hantera HTTP-förfrågningar
// och skicka svar tillbaka till klienten.

import { Request, Response } from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../services/UserService";

const validRoles = ["user", "admin", "superadmin"];

// get all
export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// update
export const updateUserController = async (req: Request, res: Response) => {
  const { name, email, roles } = req.body;
  const { id } = req.params;
  console.log(req.body);

  const rolesArray = Array.isArray(roles) ? roles : [roles];

  if (
    rolesArray &&
    !rolesArray.every((role: string) => validRoles.includes(role))
  ) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    // Hitta och uppdatera användaren baserat på _id
    const updatedUser = await updateUser(id, name, email, roles);

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
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// delete
export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);

  try {
    const deletedUser = await deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found " });
    }

    console.log("User deleted successfully", deletedUser);

    res.status(200).json({ message: "User deleted successfully: ", id });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
