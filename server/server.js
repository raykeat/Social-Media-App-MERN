import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

import User from "./models/user.models.js";
import Post from "./models/posts.models.js";
import { users, posts} from "./data/index.js";

/*CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use("/assets", express.static(path.join(__dirname,'public/assets')));


//FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, "public/assets");
    },
    filename: function (req,file,cb) {
        cb(null, file.originalname);
    },
})
const upload = multer({ storage });

//ROUTES WITH FILE UPLOADS
//Authentication route to register
app.post("/auth/register", upload.single("picture"),register);
//Route for creating a post
app.post("/posts", verifyToken, upload.single("picture"), createPost);



//app.use() method of Express to mount the imported router modules/javascript files onto specific routes.
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);



//MONGOOSE SETUP
const PORT = process.env.PORT || 6001;

//process.env is an object in Node.js that provides access to environment variables. 
const uri = process.env.MONGO_URL;
//uses the mongoose library to connect to the MongoDB database using the connection string stored in the uri variable.
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
//event listener for when the MongoDB connection is established, to log a message
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!!");

    //Add initial users and posts data for social media app
    //User.insertMany(users);
    //Post.insertMany(posts);
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});

