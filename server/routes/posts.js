//DEFINING ROUTES FOR VARIOUS POSTS FUNCTIONALITIES

import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";


const Router = express.Router();

Router.get("/", verifyToken, getFeedPosts);
Router.get("/:userId/posts", verifyToken, getUserPosts);
Router.patch("/:postId/like", verifyToken, likePost);

export default Router;