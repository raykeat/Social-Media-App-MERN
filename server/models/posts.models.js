//import the mongoose library
import mongoose from 'mongoose';

//defining a user schema using the 'mongoose.Schema' constructor
//schema is a blueprint that defines structure of documents stored in a MongoDB collection
//The first set of curly braces is for defining individual fields, 
//and the second set is for specifying schema-level options.

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    likes: {
        //using map data structure to store likes of a post
        //map data structure has key value pairs
        //Each key represents a user, and the corresponding Boolean value 
        //indicates whether that user has liked the post 
        //provides more time efficient and faster lookup of whether a user has liked a post
        type: Map,
        //specifies data type of values in the map are Boolean
        of: Boolean,
    },

    comments: {
        type: Array,
        default: [],
    },
    
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,

}, {timestamps: true})


//creates a mongoose model named 'Post' based on the post schema
//model is an instances of documents based on the schema
const Post = mongoose.model('Post', PostSchema);

//exporting model so it can be used in other parts of the application
export default Post;