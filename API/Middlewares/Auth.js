import { User } from "../Models/User";
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";

//.env
config({path: '.env'});

export const Authentication = async (req , res , next) => {
    const token = req.header('Auth');
    if(!token) return res.status(401).json({message: 'Access denied, Login First'});
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;
        const user = await User.findById(id);
        if(!user) return res.status(404).json({message: 'User not found'});
        req.user = user;
        next();
    }catch(err){
        res.json({message: err.message});
    }
}

