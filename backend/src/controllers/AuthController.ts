import { Request, Response } from "express";
import { loginUser, registerUser } from '../services/AuthService';
import { findUserByEmail } from "../services/UserService";

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
    let { name, email, password, roles } = req.body;

    console.log("Request received:", { name, email, password, roles });

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return res
        .status(400)
        .json({ message: "User with this email does already exist." });
    }

    if (typeof roles === 'string') {
      roles = [roles];
    }
    
    if (roles && !roles.every((role: string) => validRoles.includes(role))) {
      return res.status(400).json({ message: 'Invalid role' });
    }
  
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
  
    try {
      const newUser = await registerUser(name, email, password, roles);
      console.log("User successfully created:", newUser);
  
      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        roles: newUser.roles,
      });
    } catch (error) {
      console.log('Error creating user:', error);
      res.status(500).json({ message: "Error creating user", error });
    }
  };