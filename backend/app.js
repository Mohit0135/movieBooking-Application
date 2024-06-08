const express = require('express') ;
const mongoose = require('mongoose');
const userRouter = require('./Routes/userRoute');
const  dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use("/user", userRouter);

mongoose
    .connect(
        `mongodb://admin:${process.env.MONGODB_PASSWORD}@ac-xsvaomc-shard-00-00.twztgos.mongodb.net:27017,ac-xsvaomc-shard-00-01.twztgos.mongodb.net:27017,ac-xsvaomc-shard-00-02.twztgos.mongodb.net:27017/?replicaSet=atlas-eippq4-shard-0&ssl=true&authSource=admin`
    )
    .then(() => 
    app.listen(5000,()=>
        console.log(`connected to Databse and Server is running ${5000}`)
        )
    )
    .catch((e)=> console.log(e));

