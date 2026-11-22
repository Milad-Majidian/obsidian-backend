import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await authService.login({
        email,
        password,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      return res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error) {
        return res.status(400).json({ message: (error as Error).message });
    }
  },
  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token missing" });
        }
        const newAccessToken = await authService.refreshToken(refreshToken);
        return res.status(200).json({
            success: true,
            accessToken: newAccessToken,
        });
    } catch (error) {
        return res.status(401).json({ message : "Refresh token invalid" });
    }
  },
  async logout(req: Request, res: Response) {   
    res.clearCookie("refreshToken");
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  },
};
