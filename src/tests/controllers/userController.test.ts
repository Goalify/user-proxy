import request from 'supertest';
import express from 'express';
import app from '../../app';
import { UserModel } from '../../models/user';
import { assert } from 'console';
import jwt from 'jsonwebtoken';
import { User } from '../../types/userTypes';

describe('userController', () => {
    describe('register', () => {
        jest.spyOn(UserModel, 'findOne')
            .mockReturnValue(Promise.resolve(null as User));
        
        jest.spyOn(UserModel, 'create')
            .mockImplementationOnce(() => Promise.resolve({
                _id: 'some-id',
                username: 'test-username',
                email: 'test-email',
                password: 'test-password'
            }));
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'sometoken');

        it('registers a user', (done) => {
            request(app)
                .post('/register')
                .send({
                    "username": "test-username",
                    "email": "test@test-mail.com",
                    "password": "test-password"
                })
                .expect(200)
                .then(response => {
                    assert(response.body, {
                        "username": "test-username",
                        "email": "test-email",
                        "password": "test-password",
                        "_id": "some-id",
                        "__v": 0,
                        "token": "sometoken"
                    })
                })
        })
        
    })
})


