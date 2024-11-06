import {User} from '../Models/User.js';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
import mongoose from 'mongoose';

// .env

config({path: '.env'});

export const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find();
        if(!user) return res.status(404).json({message:"User not found"})
        res.json({message:"All Users", user});
    }catch (err) {
        res.json({error: "Server error: " + err.message});
    }
}

export const addUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        // Hash Password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        let user = await User.findOne({email});
        if (user) return res.json({success: false, message: "User already exists"});
        user = await User.create({name:name, email:email, password:hashedPassword});
        res.json({ success: true, message: "User created successfully" , user });

    }catch (err){
        res.json({success: false, error: "Server error: " + err.message});
    }
}

export const loginUser = async (req, res, next) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found"});

        const isMatch = await bycrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"});

        // Generate JWT
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.json({message: "Logged in successfully", token, user});
    }catch (err){
        res.json({error: "Server error: " + err.message});
    }
}

// Get the User By Id 
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log("Invalid ID format");
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found in database");
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Current User:", user });
    } catch (err) {
        console.error("Server error:", err.message);
        res.status(500).json({ error: "Server error: " + err.message });
    }
};


