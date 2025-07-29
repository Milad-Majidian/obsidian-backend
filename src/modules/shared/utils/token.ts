import jwt, { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms'; 

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? '';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? '';

if (!accessTokenSecret || !refreshTokenSecret) {
  throw new Error('Access or Refresh token secret is not defined in environment variables');
}

const accessTokenExpiresIn = (process.env.ACCESS_TOKEN_EXPIRATION_IN ?? '1h') as StringValue;
const refreshTokenExpiresIn = (process.env.REFRESH_TOKEN_EXPIRATION_IN ?? '7d') as StringValue;

export const generateAccessToken = (userId: string): string =>
  jwt.sign({ userId }, accessTokenSecret, { expiresIn: accessTokenExpiresIn });

export const generateRefreshToken = (userId: string): string =>
  jwt.sign({ userId }, refreshTokenSecret, { expiresIn: refreshTokenExpiresIn });
