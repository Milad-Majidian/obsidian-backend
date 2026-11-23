import { User } from "@/modules/shared/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthTokens, JwtPayload, LoginInput } from "../types/auth.types";
import { AdminModel } from "@/modules/shared/models/admin.model";


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ;

export const authService = {
    async login(input: LoginInput): Promise<AuthTokens> {
        const admin = await AdminModel.findOne({ email: input.email });

        if (!admin) {
            throw new Error('User not found');
        }
        if (!admin.password || typeof admin.password !== 'string') {
            throw new Error('User password is missing or invalid');
        }
        const isPasswordValid = await bcrypt.compare(input.password, admin.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        // Here you would generate JWT tokens (access and refresh)
        const accessToken = jwt.sign({userId: admin._id, email: admin.email}, ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
        const refreshToken = jwt.sign({userId: admin._id, email: admin.email}, REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });


        return { accessToken, refreshToken };    
    },

    async refreshToken(token: string): Promise<string> {
        try {
            const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET as string) as JwtPayload;
            const user = await User.findById(decoded.userId);
            if (!user) {
                throw new Error('User not found');
            }
            const newAccessToken = jwt.sign(
                {
                 userId: user._id,
                 email: user.email
                }, 
                ACCESS_TOKEN_SECRET as string, 
                { expiresIn: '15m' }
            );
  
            return newAccessToken


        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    },

    async logout(token: string): Promise<void> {
        // In a real application, you would store the refresh token in a database or cache and mark it as invalidated.
        // For this example, we'll just simulate the logout process.
        try {
            const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET as string) as JwtPayload;
            const user = await User.findById(decoded.userId);
            if (!user) {
                throw new Error('User not found');
            }
            // Here you would remove the refresh token from your storage (e.g., database or cache)
            // For example: await RefreshTokenModel.deleteOne({ token });
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
}

