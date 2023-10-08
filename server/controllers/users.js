//Controller Functions used for Various User Functionalities

import User from "../models/user.models.js";

export const getUser = async(req,res) => {
    try{
        //object destructuring to extract the property 'id'
        //from the req.params object and assign its value to the 'id' variable
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch(error){
        res.status(404).json({ message: error.message});
    }
}

export const getUserFriends = async(req,res) => {
    try{

        const { id } = req.params;
        const user = await User.findById(id);

        //Promise.all is used to handle multiple asynchronous operations concurrently. 
        const friends = await Promise.all(
            //queries the database for each friend's ID and returns an array of friend objects
            //map function iterates over an array and transform each element in the array 
            //based on a provided function. It returns a new array containing the results of 
            //applying the provided function to each element of the original array.
            user.friends.map((id) => User.findById(id))
        );

        const formatted_friends = friends.map(
            ({_id, firstname, lastname, occupation, location, picturepath}) => {
                return {_id, firstname, lastname, occupation, location, picturepath};
            }
        );

        res.status(200).json(formatted_friends);


    } catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const addRemoveFriend = async(req,res) => {
    try{

        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        //if friendId is in user's friends array, remove their Ids from each other's friends array
        if (user.friends.includes(friendId)){
            //filter is a built-in JavaScript array method
            //that iterates over an original array, and creates a new array 
            //containing all elements from the original array that satisfy a given condition. 
            user.friends = user.friends.filter((id) => id !== friendId);

            friend.friends = friend.friends.filter((id) => id !== id);
        }

        //if friendId is NOT in user's friends array, add them to each other's friends array
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        
        //RETURNING AN ARRAY OF FRIEND OBJECTS ATTRIBUTES TO FRONTEND
        const friends = await Promise.all(
            //queries the database for each friend's ID and returns an array of friend objects
            //map function iterates over an array and transform each element in the array 
            //based on a provided function. It returns a new array containing the results of 
            //applying the provided function to each element of the original array.
            user.friends.map((id) => User.findById(id))
        );

        const formatted_friends = friends.map(
            ({_id, firstname, lastname, occupation, location, picturepath}) => {
                return {_id, firstname, lastname, occupation, location, picturepath};
            }
        );

        res.status(200).json(formatted_friends);



    } catch(error){
        res.status(404).json({error: error});
    }
}