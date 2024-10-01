import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'express';
import contactRouter from './Routes/Contact.js';
import cors from 'cors';

const app = express();
const port = 2000;

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true,
}));

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ravibhpatel:pdHdfRUTVpfY1jA0@cluster0.vqtsa.mongodb.net/',{
    dbName: 'mern_contacts_api'
}).then(()=>console.log('MongoDb Connect Successfully'))
.catch(err=> console.log(err));

app.use('/', contactRouter);



// Middleware

app.listen(port, ()=>console.log(`Listen On port ${port}`));