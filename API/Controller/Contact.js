import { Contact } from "../Models/Contact.js";


// Get all contacts
export const getAllContact = async (req,res)=>{     
    try{
        // const contacts = await Contact.find({});
        // if(!contacts) return res.status(404).json({Message: 'contacts not found'});
        res.json({Message : "Welcome Api"});

    }catch(err){
       return res.status(500).json({error: err.message});        
    }
}

// Add a new contact
export const addContact = async (req,res)=>{
    try{
        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        });
        
        const contact = await Contact.create(newContact);
        res.json({Message: "Contact Created Successfully" },contact);

    }catch(err){
        return res.status(400).json({error: err.message});        
    }
}
