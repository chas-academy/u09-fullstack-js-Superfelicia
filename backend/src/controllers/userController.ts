// userController ansvarar för att hantera HTTP-förfrågningar
// och skicka svar tillbaka till klienten.

import { Request, Response } from "express";
import {
  deleteUser,
  findUserByEmail,
  getAllUsers,
  resetUserPassword,
  updateUser,
  updateUserPassword,
} from "../services/userService";

const validRoles = ["user", "admin", "superadmin"];

// // create
// export const createUserController = async (req: Request, res: Response) => {
//   const { name, email, password, roles } = req.body;

//   if (!password || password.length < 6) {
//     return res.status(400).json({ message: 'Password must be at least 6 characters long' });
//   }

//   if (roles && !validRoles.includes(roles)) {
//     return res.status(400).json({ message: "Invalid role" });
//   }

//   try {
//     const existingUser = await findUserByEmail(email);
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "User with this email does already exist." });
//     }

//     const newUser = await createUser(name, email, password, roles);

//     res.status(201).json({
//       id: newUser.id,
//       name: newUser.name,
//       email: newUser.email,
//       roles: newUser.roles,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating user", error });
//   }
// };

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

// kontroll för att uppdatera lösenord
export const updateUserPasswordController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const updatedUser = await updateUserPassword(
      id,
      currentPassword,
      newPassword
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Password updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        roles: updatedUser.roles,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// reset user lösenord
export const resetUserPasswordController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    // byt namn på const updatedUser till något med reset imorgon
    const updatedUser = await resetUserPassword(id, newPassword);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Password reset successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        roles: updatedUser.roles,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// delete
export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.body;
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
