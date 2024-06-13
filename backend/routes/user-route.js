const express = require('express');
const Users = require('../controllers/user-controller');
const userRouter = express.Router();

userRouter.get(
    '/getAllUsers',
    Users.getAllUsers
);

userRouter.post(
    '/addUsers',
    Users.addUsers
);

userRouter.post(
    '/signup',
    Users.signup
);

module.exports = userRouter;