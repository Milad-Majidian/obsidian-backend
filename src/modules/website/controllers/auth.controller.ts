import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "@/modules/shared/models/user.model";
import { generateAccessToken, generateRefreshToken } from "@/modules/shared/utils/token";


export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        const accessToken = generateAccessToken(user.id)
        const refreshToken = generateRefreshToken(user.id);
            return res.status(201).json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                },
               tokens:{
                    accessToken,
                    refreshToken
               }
            });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    } 
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user || !user.password) return res.status(401).json({ message: "Invalid credentials" });

        const iMatch = await bcrypt.compare(password, user.password);
        if (!iMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        return res.status(200).json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
            },
            tokens: {
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Error logging in user" });
    }
 }