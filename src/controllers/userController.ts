import { UserModel } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as express from 'express';

const registerController = async (req: express.Request, res: express.Response) => {
    try{
        const { username, email, password } = req.body;
        console.log(req.body)
        if (!(email && password && username)) {
            res.status(400).send("All input is required");
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
}