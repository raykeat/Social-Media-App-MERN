import jwt from 'jsonwebtoken';

//async function used for AUTHORIZATION
//ie ensure signed in users are only authorized to access certain information
export const verifyToken = async(req,res,next) => {
    try{
        let token = req.header("Authorization");

        if (!token){
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft()
        }
        
        //jwt.verify() method uses the provided token and secret key to verify the token's signature.
        //if token's signature is valid and verification is successful, 
        //jwt.verify() returns the decoded payload of the JWT.
        //This payload typically contains user info or other data associated with the token.
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch(error){
        res.status(500).json({ error: error.message});
    }
}