import { useParams } from "react-router-dom";
import { useMediaQuery, Box } from "@mui/material";
import { useEffect, useState } from "react";
import UserWidget from "scenes/widgets/UserWidget";
import CreatePostWidget from "scenes/widgets/CreatePostWidget";
import AllPostsWidget from "scenes/widgets/AllPostsWidget";
import FriendsWidget from "scenes/widgets/FriendsWidget";
import NavBar from "scenes/navbar";
import { useSelector } from "react-redux";


const ProfilePage = () => {

    // object destructuring to access person's userId in the route parameters
    const { userId } = useParams();

    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

    const [profilePerson, setProfilePerson] = useState();
    const token = useSelector((state)=>state.token);


    //function to retrieve person's details since current user is on their profile page
    const retrieve_person = async() => {

        const response = await fetch(`http://localhost:3001/users/${userId}`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        //parses response from a JSON String to a Javascript Object
        const jsonresponse = await response.json();
        if (response.ok){
            setProfilePerson(jsonresponse);
            console.log(jsonresponse);
        }
        else{
            console.log(jsonresponse);
        }
    };

    useEffect(()=>{
        retrieve_person();
    },[]);


    return (
        <Box>
            <NavBar />


            <Box
                width="80%"
                padding="2rem 6%"
                gap="0.5rem"
                justifyContent="space-between"
                alignContent="center"
                display={isNonMobileScreen ? "flex" : "box"}
            >

                {/*For profile person's UserWidget and friends list at left side */}
                <Box flexBasis={isNonMobileScreen ? "30%" : undefined}>
                    {profilePerson && (
                        <UserWidget userId={userId} picturePath={profilePerson.picturepath} />
                    )}

                    <FriendsWidget userId={userId} />
                </Box>


                {/*For profile person's CreatePost Widget and AllPosts Widget at right side */}
                <Box flexBasis={isNonMobileScreen ? "50%" : undefined}>
                    {profilePerson && (
                        <CreatePostWidget picturePath={profilePerson.picturepath} />
                    )}

                    <AllPostsWidget userId={userId} isProfile={true} />
                </Box>


            </Box>

        </Box>

    )
}

export default ProfilePage;