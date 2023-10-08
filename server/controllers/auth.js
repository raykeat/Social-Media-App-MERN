import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/user.models.js';
//CONTROLLER FUNCTIONS USED FOR AUTHENTICATION (register,login)

//In the context of frameworks like Express (Node.js) or Django (Python), 
//controllers are often implemented as functions or classes 
//that handle specific routes and their corresponding logic. 
//They act as intermediaries between the user interface and the data, 
//allowing for efficient request handling and code organization.

//REGISTER USER
//takes in user registration details from the frontend,
//then creates a new User in MongoDB database
export const register = async (req,res) => {
    try{

        //object destructuring to assign req.body to various attributes
        const {
            firstname,
            lastname,
            email,
            password,
            picturepath,
            friends,
            location,
            occupation
        } = req.body;


        //Generate a random salt (random string of characters which are added to password)
        //Combine the user's password with the salt.
        //Hash the combined data using a secure hash function.
        //Store the salt and the hash in the database for that user.

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: passwordHash,
            picturepath,
            friends,
            location,
            occupation,
            viewedprofile: 0,
            impressions: 0,

        });

        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).json(savedUser);

    } catch(error){
        res.status(500).json(error);
    }
}

//login controller function
export const login = async(req,res) => {

    try{
        const {
            email,
            password
        } = req.body;
        
        //finding user with email specified in login
        const user = await User.findOne({email: email});
        if (!user){
            return res.status(400).json({error: "User does not exist"});
        } 
        
        //checking if passwords match
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({error: "Password is wrong"});
        } else{
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.status(200).json({ token, user });
        }

    } 

    catch(error){
        res.status(500).json(error);
    }


}