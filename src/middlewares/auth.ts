import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import * as express from 'express';
import { User } from '../models/user';
import { JwtPayload } from 'jsonwebtoken';

dotenv.config();
const config = process.env;

interface AuthRequest extends express.Request{
    user?: string | JwtPayload
}

const verifyToken = (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export const auth = verifyToken;