//Defining Routes for various User Functionalities eg get user info, add friends

import express from "express";

//importing various controller functions to handle different routes and their logic
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";

//importing verifyToken middleware function 
import { verifyToken } from "../middleware/auth.js";



//creating an instance of an Express router using the express.Router() function.
const Router = express.Router();
//get "/:id" route that calls the verifyToken middleware function, 
//followed by getUser controller function
Router.get("/:id", verifyToken, getUser);
Router.get("/:id/friends", verifyToken, getUserFriends);

//router.patch used to update specific fields of existing resources without modifying other fields.
//while router.post used to perform extensive updates with significant changes to the data
Router.patch("/:id/:friendId", verifyToken, addRemoveFriend);


export default Router;