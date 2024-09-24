import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  // generera JWT-token
  const token = jwt.sign(
    { id: user.id, roles: user.roles },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
    user: { name: user.name, email: user.email, roles: user.roles },
  };
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  roles: string
) => {
  // hasha lösenord
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ name, email, password: hashedPassword, roles });
  return await newUser.save();
};

// vi kan lägga till andra auth operations, som logout eller change of password etc.
