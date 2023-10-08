//Defining Log In Authentication Route

import express from "express";
//importing login controller/function
import { login } from "../controllers/auth.js";

//creating an instance of an Express router using the express.Router() function.
const Router = express.Router();

//importing the User Model
import User from '../models/user.models.js';

//Defining an Express "/login" post route that invokes the login controller function 
Router.post("/login", login);

export default Router;