import {User} from '../Models/User.js';

export const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find();
        if(!user) return res.status(404).json({message:"User not found"})
        res.json({message:"All Users", user});
    }catch (err) {
        res.json({error: err.message});
    }
}

export const addUser = async (req, res, next) => {
    try{
        const {name, email, password} = req.body;
        let user = await User.findOne({email});
        if (user) return res.json({message: "User already exists"});
        user = await User.create({name:name, email:email, password:password});
        res.json({message: "User created successfully"});

    }catch (err){
        res.json({error: err.message});
    }
}