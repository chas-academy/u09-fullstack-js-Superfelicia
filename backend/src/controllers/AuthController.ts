import { Request, Response } from "express";
import { loginUser, registerUser } from '../services/authService';
import { findUserByEmail } from "../services/userService";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const data = await loginUser(email, password);
        res.json(data);
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}

const validRoles = ["user", "admin", "superadmin"];

// create
export const registerUserController = async (req: Request, res: Response) => {
    const { name, email, password, roles } = req.body;
  
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
  
    if (roles && !validRoles.includes(roles)) {
      return res.status(400).json({ message: "Invalid role" });
    }
  
    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email does already exist." });
      }
  
      const newUser = await registerUser(name, email, password, roles);
  
      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        roles: newUser.roles,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  };