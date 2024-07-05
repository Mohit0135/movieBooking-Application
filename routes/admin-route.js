const express = require('express');
const Admin = require ("../controllers/admin-controller");

const adminRouter = express.Router();

adminRouter.post(
    "/signup", 
    Admin.addAdmin
);

adminRouter.get(
    "/adminLogin", 
    Admin.adminLogin
);

module.exports = adminRouter;
