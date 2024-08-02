const express = require('express');
const Users = require('../controllers/user-controller');
const userRouter = express.Router();

userRouter.get(
    '/postCategories',
    Users.postCategories
);

userRouter.get(
    '/getAllUsers',
    Users.getAllUsers
);

userRouter.post(
    '/signup',
    Users.signup
);

userRouter.patch(
    '/updateUser/:id',
    Users.updateUser
);

userRouter.delete(
    '/deleteUser/:id',
    Users.deleteUser
);

userRouter.get(
    '/login',
    Users.login
);

module.exports = userRouter;
