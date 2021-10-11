import express from 'express';
import { UserModel } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: express.Request, res: express.Response) => {
    try{
        const { username, email, password } = req.body;
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
    catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
}

export const login = async (req: express.Request, res: express.Response) => {
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
    // tslint:disable-next-line:no-console
    console.log(err);
  }
}