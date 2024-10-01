import { Contact } from "../Models/Contact.js";


// Get all contacts
export const getAllContact = async (req,res)=>{
    try{
        const contacts = await Contact.find().sort({createdAt: -1});
        if(!contacts) return res.status(404).json({message: 'Contact not found'});
        res.json({Message:"All Contacts",contacts});
    }
    catch(err){
        res.json({error: err.message});
    }
}

// Edit a contact

export const editContact = async(req,res)=>{
    try{
        const id = req.params.id;
        const updateContact = req.body; //
        let contact = await Contact.findById(id);
        if(!contact) return res.status(404).json({message: 'Contact Not Found'}); 
        let data = await Contact.findByIdAndUpdate(id, updateContact,{new: true});
        res.json({message: 'Contact Updated Successfully',data}); 
    }catch(err){
        res.json({error: err.message});
    }
}

// Add a new contact
export const addContact = async (req,res)=>{
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
}

//  Delete a contact

export const deleteContact = async(req,res)=>{
    try{
        const id = req.params.id;
        let contact = await Contact.findById(id);
        if(!contact) return res.status(404).json({message: 'Contact Not Exists'});
        await contact.deleteOne();
        res.json({message: 'Contact Deleted Successfully'});
    }catch(err){
        res.json({error: err.message});
    }
}
