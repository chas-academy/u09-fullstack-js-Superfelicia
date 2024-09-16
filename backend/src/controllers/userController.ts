import { Request, Response } from "express";
import User from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email does already exist." });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id, name, email, roles } = req.body;
  console.log(req.body);
  try {
    // Hitta och uppdatera användaren baserat på _id
    const updateUser = await User.findOneAndUpdate(
      // objektet vi letar efter
      { _id: id },
      // fälten som ska uppdateras
      { name, email, roles },
      // returnera det uppdaterade json dokumentet
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      roles: updateUser.roles,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.body;
    console.log(id);

  try {
    const userToDelete = await User.findByIdAndDelete(id);

    console.log("User deleted successfully", userToDelete);
    res.status(200).json(id);
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
