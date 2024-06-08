const express = require('express');
const userController = require('../Controllers/userController');

const userRouter = express.Router();

userRouter.post(
    "/userAuthentication",
    userController.userAuthentication
)

userRouter.get(
    "/booking",
    userController.userBooking
)

userRouter.get(
    "/bookingHistory",
    userController.userBooking
)

