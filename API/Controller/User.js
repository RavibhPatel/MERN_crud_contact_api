import {User} from '../Models/User.js';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";

// .env

config({path: '.env'});

export const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find();
        if(!user) return res.status(404).json({message:"User not found"})
        res.json({message:"All Users", user});
    }catch (err) {
        res.json({error: err.message});
    }
}

export const addUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        // Hash Password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        let user = await User.findOne({email});
        if (user) return res.json({message: "User already exists"});
        user = await User.create({name:name, email:email, password:hashedPassword});
        res.json({message: "User created successfully"});

    }catch (err){
        res.json({error: err.message});
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
        res.json({message: "Logged in successfully", token});
    }catch (err){
        res.json({error: err.message});
    }
}
