import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween.jsx";
import UserImage from "./UserImage.jsx";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=>state.user);
    const { _id } = useSelector((state)=>state.user);
    const token = useSelector((state)=>state.token);
    //find() is a built-in method in JavaScript for arrays. It is used to 
    //search for the first element in an array that satisfies a specified condition.
    //checking if the person is in the current user's friends list
    const [isFriend, setIsFriend] = useState();

    //function to retrieve current user's friends
    const retrieveFriends = async() =>{

        const response = await fetch(`http://localhost:3001/users/${_id}/friends`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })

        const jsonresponse = await response.json();
        await dispatch(setFriends(jsonresponse));
        setIsFriend(jsonresponse && jsonresponse.find((friend)=>friend._id===friendId));
    };

    useEffect(()=>{
        retrieveFriends();
    },[]);
    //const friends = useSelector((state)=>state.user.friends);
    //console.log(friends);


    //function to add or remove friend from current user's friends list
    const addRemoveFriend = async()=>{

        const response = await fetch(
            `http://localhost:3001/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        )
        //json response of user's updated friends list
        const jsonresponse = await response.json();
        console.log(jsonresponse);

        dispatch(setFriends(jsonresponse));
        //.find() method checks if person is a friend of current user, returns person if so, else returns undefined
        setIsFriend(jsonresponse && jsonresponse.find((friend)=>friend._id===friendId));
        //reloading the page so that the local friends state of FriendsWidget can be updated quickly
        window.location.reload();
    };


    return(
        <FlexBetween sx={{marginBottom: "0.5rem"}}>

            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={()=>{
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover":{
                                color:palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    
                    <Typography color={medium} fontSize="0.5 rem">
                        {subtitle}
                    </Typography>

                </Box>
            </FlexBetween>

            <IconButton
                onClick={addRemoveFriend}
                sx={{ backgroundColor: primaryLight, p:"0.6rem"}}
            >
                {isFriend ? (
                    <PersonRemoveOutlined sx={{color: primaryDark}} />
                ):(
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                )}
            </IconButton>

        </FlexBetween>
    )
}

export default Friend;