import express from 'express';
import databaseConnect from "./config/database";
import { UserModel } from './models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { auth } from './middlewares/auth';
import cors from 'cors';


dotenv.config();

const app = express();

databaseConnect();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    try{
        const { username, email, password } = req.body;
        console.log(req.body)
        if (!(email && password && username)) {
          res.status(400).send("All input is required");
          return;
        }

        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword
        });

        const token = jwt.sign(
            { user_id: newUser._id, username },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        newUser.token = token;

        res.status(200).json(newUser);
    }
    catch(e){
        console.log(e);
        
    }

});

app.post("/login", async (req, res) => {

  try {
    const { username, password } = req.body;
    
    if (!(username && password)) {
      res.status(400).send("All input is required");
      return;
    }
    const user = await UserModel.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      res.status(200).json(user);
      return;
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.get("/goals", auth, async (req, res) => {
  try {
    const username = req.query.username as string;
    if(!username){
      res.status(400).send("Username missing");
      return;
    }
    
    const user = await UserModel.findOne({ username })
    if (user) {
      res.status(200).json({
        list: [{
            id: "1",
            state: "InProgress",
            name: "Presentation",
            description: "this is the description",
            milestones: [{id: "1", state: true, name: "milestone1"}, {id: "2", state: false, name: "milestone2"},
            {id: "3", state: false, name: "milestone3"}],
            published: true,
            deadline: "12/Sep",
            dateCreated: "10/9/2021",
            dateFinished: null
        }]
      });
      return;
    }
    res.status(400).send("invalid token");
  } catch(err){
    console.log(err);
  }
});


app.post("/test", auth, (req, res) => {
    res.status(200).send('test passed');
})

export default app;