import { JwtPayload } from 'jsonwebtoken';
import * as express from 'express';

export interface AuthRequest extends express.Request{
    user?: string | JwtPayload
}

export interface User {
  username: string;
  email: string;
  password: string;
  token?: string;
  user_id?: string;
}