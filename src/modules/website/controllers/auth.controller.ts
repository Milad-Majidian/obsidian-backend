import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "@/modules/shared/models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/modules/shared/utils/token";
import { verifyRefreshToken } from "@/modules/shared/utils/verifyRefreshToken";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    const accessToken = generateAccessToken(user.id);
    // const refreshToken = generateRefreshToken(user.id);
    return res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
      tokens: {
        accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(401).json({ message: "Invalid credentials" });

    const iMatch = await bcrypt.compare(password, user.password);
    if (!iMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //    // Set tokens as secure HTTP-only cookies
    // res.cookie("accessToken", accessToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // only use HTTPS in prod
    //   sameSite: "lax", // CSRF protection
    //   maxAge: 1000 * 60 * 15, // 15 minutes
    // });

    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "lax",
    //   maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    // });


    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

 
    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
};

const refreshTokens: string[] = [];

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Missing refresh token" });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken); // implement jwt.verify
    if (!decoded) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id); // rotate if desired

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to refresh token" });
  }
};

