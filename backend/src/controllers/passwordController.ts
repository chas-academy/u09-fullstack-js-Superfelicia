import { Request, Response } from "express";
import { sendPasswordResetEmail } from "../services/emailService";
import { resetPassword } from "../services/passwordService";

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
