import express from 'express';
import databaseConnect from "./config/database";
import { UserModel } from './models/user';
import { User } from './types/userTypes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { auth } from './middlewares/auth';
import cors from 'cors';
import * as userController from './controllers/userController';
import * as goalsController from './controllers/goalsController';

const app = express();

databaseConnect();

app.use(express.json());
app.use(cors());

app.post("/register", userController.register);
app.post("/login", userController.login);

app.get("/get-goals", auth, goalsController.get_goals);
app.post("/add-goal", auth, goalsController.add_goal);
app.post("/add-milestone", auth, goalsController.add_milestone);
app.post("/remove-goal", auth, goalsController.remove_goal);
app.post("/remove-milestone", auth, goalsController.remove_milestone);
app.post("/edit-goal", auth, goalsController.edit_goal);
app.post("/edit_milstone", auth, goalsController.edit_milestone);
app.post("/discover", auth, goalsController.discover);

app.post("/test", auth, (req, res) => {
    res.status(200).send('test passed');
})

export default app;