import { Request, Response } from "express";
import { sendPasswordResetEmail } from "../services/tempEmailService";
import { resetPassword } from "../services/tempPasswordService";
import { resetUserPassword, updateUserPassword } from "../services/tempUserService";

// begäran om lösenordsåterställning
export const requestPasswordResetController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  try {
    await sendPasswordResetEmail(email);
    console.log(`Password reset link sent to: ${email}`);
    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error: any) {
    console.error(`Error in requestPasswordResetController: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// återställning av lösenord
export const resetPasswordController = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const result = await resetPassword(token, newPassword);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(`Error in resetPasswordController: ${error.message}`);
    res.status(500).json({ message: error.message });
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

// reset user lösenord som admin
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