import express from 'express';
import dotenv from "dotenv";
import databaseConnect from "./config/database";

const app = express();

dotenv.config();
const port = process.env.SERVER_PORT;

databaseConnect();

app.use(express.json());

export default app;