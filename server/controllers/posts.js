import Post from '../models/posts.models.js';
import User from '../models/user.models.js';


//controller function to create a post
export const createPost = async(req,res) => {
    try{
        //object destructuring to assign req.param object's attributes to various variables
        const { userId, description, picturePath } = req.body;

        const user = await User.findById(userId);

        const newPost = new Post({
            userId,
            firstname: user.firstname,
            lastname: user.lastname,
            likes: {},
            comments: [], 
            location: user.location,
            description,
            picturePath,
            userPicturePath: user.picturepath,
        })

        const savedPost = await newPost.save();
        
        //return all the posts including newly created post
        const posts = await Post.find();
        res.status(201).json(posts);

    } catch(error){
        res.status(409).json({error:error.message});
    }
}

//controller function to get feed posts
export const getFeedPosts = async(req,res) => {

    try{
        const posts = await Post.find();
        res.status(200).json(posts);

    } catch(error){
        res.status(404).json({error:error.message});
    }
}


//controller function to get user's posts
export const getUserPosts = async(req,res) => {
    try{
        const { userId } = req.params;
        //can use MongoDB's query methods to 
        //find documents based on any attribute of a model.
        //In MongoDB's query, when you use an object with a single key-value pair like this, 
        //MongoDB treats the key as the name of the attribute and the value as the value to find.
        const posts = await Post.find( {userId} );
        res.status(200).json(posts);


    } catch(error){
        res.status(404).json({error:error.message});
    }
}


//controller function to like/unlike a post
export const likePost = async(req,res)=>{
    try{
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await Post.findById(postId);
        const isLiked = post.likes.get(userId);


        //1.33.12
        if (isLiked){
            post.likes.delete(userId);
        } else{
            post.likes.set(userId, true);
        }

        await post.save();
        return res.status(200).json(post);


    } catch(error){
        res.status(404).json({error:error.message});
    }

}