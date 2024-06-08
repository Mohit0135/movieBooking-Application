const express = require('express');
const adminController = require('../Controllers/adminController');
//middlewares are required

const userRouter = express.Router();

userRouter.post(
    "/adminAuthentication",
    adminController.adminAuthentication
);

userRouter.get(
    "/booking",
    adminController.adminBooking
)

userRouter.get(
    "/bookingHistory",
    adminController.adminBookingHistory
)

userRouter.post(
    "/addMovie",
    adminController.addMovie
)

export default userRouter;
