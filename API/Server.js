import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'express';
import contactRouter from './Routes/Contact.js';
import userRouter from './Routes/User.js';
import cors from 'cors';
import { config } from 'dotenv';

const app = express();
const port = 2000;

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true,
}));

app.use(bodyParser.json());

config({path: '.env'});

mongoose.connect( process.env.MongoUrl,{dbName: 'mern_contacts_api'})
.then(()=>console.log('MongoDb Connect Successfully'))
.catch(err=> console.log(err));

app.use('/', contactRouter);

app.use('/user', userRouter);



// Middleware

app.listen(port, ()=>console.log(`Listen On port ${port}`));