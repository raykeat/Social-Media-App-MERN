//import the mongoose library
import mongoose from 'mongoose';

//defining a user schema using the 'mongoose.Schema' constructor
//schema is a blueprint that defines structure of documents stored in a MongoDB collection
//The first set of curly braces is for defining individual fields, 
//and the second set is for specifying schema-level options.

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastname: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 60,
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    picturepath: {
        type: String,
        default: "",
        min: 5,
    },
    friends: {
        type: Array,
        default: [],
    },
    location: String,
    occupation: String,
    viewedprofile: Number,
    impressions: Number,

},{timestamps: true})

//creates a mongoose model named 'User' based on the user schema
//model is an instances of documents based on the schema
const User = mongoose.model('User',UserSchema);

//exporting model so it can be used in other parts of the application
export default User;
