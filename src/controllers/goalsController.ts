import { UserModel } from '../models/user';
import jwt from 'jsonwebtoken';
import * as express from 'express';
import dotenv from 'dotenv';
import { User } from '../types/userTypes';
import fetch from 'node-fetch';

dotenv.config();
const config = process.env;

export const getGoals = async (req: express.Request, res: express.Response) => {
  try {
    const token = req.query.token as string;
    const decoded = jwt.verify(token, config.TOKEN_KEY) as User;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: decoded.user_id
        })
    }

    fetch(`http://localhost:${config.BACKEND_PORT}/get-goals`, requestOptions)
        .then(response => response.json())
        .then((data) => res.status(200).json(data));
    res.status(400).send("invalid token");
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
}

export const addGoal = async (req: express.Request, res: express.Response) => {
    try {
        const { token, goal } = req.body;
        const decoded = jwt.verify(token, config.TOKEN_KEY) as User;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: decoded.user_id,
                ...goal
            })
        }

        fetch(`http://localhost:${config.BACKEND_PORT}/add-goal`, requestOptions)
            .then(response => response.json())
            .then((data) => res.status(200).json(data));
        res.status(400).send("invalid token");
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
    }
};

export const addMilestone = async (req: express.Request, res: express.Response) => {
    try {
        const { token, milestone } = req.body;
        const decoded = jwt.verify(token, config.TOKEN_KEY) as User;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: decoded.user_id,
                ...milestone
            })
        }

        fetch(`http://localhost:${config.BACKEND_PORT}/add-milestone`, requestOptions)
            .then(response => response.json())
            .then((data) => res.status(200).json(data));
        res.status(400).send("invalid token");
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
    }
};

export const removeGoal = async (req: express.Request, res: express.Response) => {
    try {
        const { token, goalId } = req.body;
        const decoded = jwt.verify(token, config.TOKEN_KEY) as User;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: decoded.user_id,
                goalId
            })
        }

        fetch(`http://localhost:${config.BACKEND_PORT}/remove-goal`, requestOptions)
            .then(response => response.json())
            .then((data) => res.status(200).json(data));
        res.status(400).send("invalid token");
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
    }
};

export const removeMilestone = async (req: express.Request, res: express.Response) => {
    try {
        const { token, milestoneId } = req.body;
        const decoded = jwt.verify(token, config.TOKEN_KEY) as User;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: decoded.user_id,
                milestoneId
            })
        }

        fetch(`http://localhost:${config.BACKEND_PORT}/remove-milestone`, requestOptions)
            .then(response => response.json())
            .then((data) => res.status(200).json(data));
        res.status(400).send("invalid token");
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
    }
};

export const editGoal = async (req: express.Request, res: express.Response) => {
    try {
        const { token, goalId, goal } = req.body;
        const decoded = jwt.verify(token, config.TOKEN_KEY) as User;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: decoded.user_id,
                goalId,
                ...goal
            })
        }

        fetch(`http://localhost:${config.BACKEND_PORT}/edit-goal`, requestOptions)
            .then(response => response.json())
            .then((data) => res.status(200).json(data));
        res.status(400).send("invalid token");
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
    }
};

export const editMilestone = async (req: express.Request, res: express.Response) => {
    try {
        const { token, milestoneId, milestone } = req.body;
        const decoded = jwt.verify(token, config.TOKEN_KEY) as User;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: decoded.user_id,
                milestoneId,
                ...milestone
            })
        }

        fetch(`http://localhost:${config.BACKEND_PORT}/edit-milestone`, requestOptions)
            .then(response => response.json())
            .then((data) => res.status(200).json(data));
        res.status(400).send("invalid token");
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
    }
};

export const discover = async (req: express.Request, res: express.Response) => {
    try {
        const { token, numRows } = req.body;
        const decoded = jwt.verify(token, config.TOKEN_KEY) as User;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: decoded.user_id,
                numRows
            })
        }

        fetch(`http://localhost:${config.BACKEND_PORT}/discover`, requestOptions)
            .then(response => response.json())
            .then((data) => res.status(200).json(data));
        res.status(400).send("invalid token");
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
    }
};