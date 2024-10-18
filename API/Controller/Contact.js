import { Contact } from "../Models/Contact.js";


// Get all contacts
export const getAllContact = async (req,res)=>{
    try{
        const contacts = await Contact.find().sort({createdAt: -1});
        if(!contacts) return res.status(404).json({message: 'Contact not found'});
        res.json({Message:"All Contacts",contacts});
    }
    catch(err){
        res.json({error: "Server error: " + err.message});
    }
}

// Edit a contact

export const editContact = async (req, res) => {
    try {
        console.log('Request Body:', req.body);  // Debugging line
        console.log('Contact ID:', req.params.id);  // Debugging line
        const { name, email, phone, lastModifiedBy } = req.body;

        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Update the contact fields
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
        contact.lastModifiedBy = lastModifiedBy;

        await contact.save();
        return res.status(200).json({ message: 'Contact updated successfully', contact });
    } catch (err) {
        console.error('Server Error:', err.message);  // Output server error
        return res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

// Add a new contact

export const addContact = async (req, res) => {
    try {
      const { name, email, phone, userId } = req.body;  // Extract userId from the body
      console.log(req.body);
  
     
      // Check if the contact with the same email already exists
      let contact = await Contact.findOne({email});
      if (contact) {
        return res.status(400).json({ message: 'Contact Already Exists' });
      }
  
      // Create the new contact
      contact = await Contact.create({name,email,phone,userId});
  
      // Return the success message and created contact
      return res.status(201).json({ message: 'Contact Added Successfully', contact });
    } catch (err) {
      // Handle any server-side errors
      return res.status(500).json({ error: 'Server error: ' + err.message });
    }
  };
  

//  Delete a contact

export const deleteContact = async(req,res)=>{
    try{
        const id = req.params.id;
        let contact = await Contact.findById(id);
        if(!contact) return res.status(404).json({message: 'Contact Not Exists'});
        await contact.deleteOne();
        res.json({message: 'Contact Deleted Successfully'});
    }catch(err){
        res.json({error: "Server error: " + err.message});
    }
}

// Get Contact By UserId

export const getContactByUserId = async (req,res)=>{
    try{
        const userId = req.params.id;
        const contacts = await Contact.find({userId}).sort({createdAt: -1});
        if(!contacts) return res.status(404).json({message: 'Contact not found'});
        res.json({Message:"All Contacts",contacts});
    }
    catch(err){
        res.json({error: "Server error: " + err.message});
    }
}