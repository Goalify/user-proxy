import { Schema, model } from 'mongoose';

export interface User {
  username: string;
  email: string;
  password: string;
  token?: string;
}

const schema = new Schema<User>({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true},
  token: { type: String}
});

export const UserModel = model<User>('User', schema);
