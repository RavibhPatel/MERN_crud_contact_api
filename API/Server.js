import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'express';
import {Contact} from './Models/Contact.js';
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

// Get all contacts
app.get('/', async (req,res)=>{
    try{
        const contacts = await Contact.find().sort({createdAt: -1});
        if(!contacts) return res.status(404).json({message: 'Contact not found'});
        res.json({Message:"All Contacts",contacts});
    }
    catch(err){
        res.json({error: err.message});
    }
});

// Add new contacts
app.post('/add', async (req,res)=>{
    try{
        const {name, email, phone} = req.body;
        let contact = await Contact.findOne({email});
        if(contact) return res.status(400).json({message: 'Contact Already Exists'});
        contact = await Contact.create({name:name, email:email, phone:phone});
        res.json({message: 'Contact Added Successfully' , contact});
    }
    catch(err){
        res.json({error: err.message});
    }
});

// Edit a contact
app.put('/update/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const updateContact = req.body;
        let contact = await Contact.findById(id);
        if(!contact) return res.status(404).json({message: 'Contact Not Found'}); 
        let data = await Contact.findByIdAndUpdate(id, updateContact,{new: true});
        res.json({message: 'Contact Updated Successfully',data}); 
    }catch(err){
        res.json({error: err.message});
    }
});

// Delete a contact

app.delete('/delete/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        let contact = await Contact.findById(id);
        if(!contact) return res.status(404).json({message: 'Contact Not Exists'});
        await contact.deleteOne();
        res.json({message: 'Contact Deleted Successfully'});
    }catch(err){
        res.json({error: err.message});
    }
})



// Middleware

app.listen(port, ()=>console.log(`Listen On port ${port}`));