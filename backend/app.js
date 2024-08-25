const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const userRoutes = require('./routes/user-route');
const adminRoutes = require('./routes/admin-route'); 
const movieRoutes = require('./routes/movie-route'); 

const { default: mongoose } = require('mongoose');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/movie', movieRoutes);

//hello moye -> moye moye

mongoose
.connect(
    `mongodb://admin:${process.env.MONGODB_PASSWORD}@ac-xsvaomc-shard-00-00.twztgos.mongodb.net:27017,ac-xsvaomc-shard-00-01.twztgos.mongodb.net:27017,ac-xsvaomc-shard-00-02.twztgos.mongodb.net:27017/?replicaSet=atlas-eippq4-shard-0&ssl=true&authSource=admin`
)
.then(() => 
    app.listen(5000,()=>
        console.log(`connected to Database and Server is running ${5000}`)
    )
)
.catch((e)=> console.log(e));
