import Friend from "components/Friend.jsx";
import WidgetWrapper from "components/WidgetWrapper.jsx";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "state/index.js";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Divider } from "@mui/material";

//friends widget functional component
const FriendsWidget = ({userId}) => {

    const { palette } = useTheme();

    const dispatch = useDispatch();
    const token = useSelector((state)=>state.token);
    const [localFriends, setLocalFriends] = useState([]);

    //function to retrieve user's friends
    const retrieveFriends = async()=>{

        const response = await fetch(`http://localhost:3001/users/${userId}/friends`,{
            method:"GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const jsonresponse = await response.json();
        console.log(jsonresponse);

        if (response.ok){
            //dispatching setFriends redux action to set global friends state
            dispatch(setFriends({friends: jsonresponse}));
            //set Local friends state
            setLocalFriends(jsonresponse);
        }
    }

    useEffect(()=>{
        retrieveFriends();
    },[]);


    //getting the global redux user's friends state
    const globalFriends = useSelector((state)=>state.user.friends);
    console.log(`Global Friends: ${globalFriends}`);


    return(

        <WidgetWrapper>

            <Box>
                <Typography 
                    fontWeight="500"
                    color={palette.neutral.dark}
                    variant="h5"
                    sx={{ mb: "0.5rem"}}
                >
                    Friends List
                </Typography>
            </Box>

            {localFriends.map( ({_id, firstname, lastname, location, picturepath}) => (
                <Friend 
                    key={_id}
                    friendId={_id}
                    name={`${firstname} ${lastname}`}
                    subtitle={location}
                    userPicturePath={picturepath}
                />
            ))}
        
        </WidgetWrapper>

    );
};

export default FriendsWidget;