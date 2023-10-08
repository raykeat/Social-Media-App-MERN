import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import CreatePostWidget from "scenes/widgets/CreatePostWidget";
import AllPostsWidget from "scenes/widgets/AllPostsWidget";
import FriendsWidget from "scenes/widgets/FriendsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";


const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    //using object destructuring to extract the _id and picturepath properties from user object stored in Redux state. 
    const { _id, picturepath } = useSelector((state)=>state.user);

    return (
        <Box>
            <Navbar />

            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent = "space-between"
            >

                {/* For Current user's User Widget at left side of main homepage */}
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturepath} />
                </Box>

                {/* To display CreatePost Widget and AllPosts Widget at center of homepage*/}
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <CreatePostWidget picturePath={picturepath}/>
                    <AllPostsWidget userId={_id} />

                </Box>

                {/* To display friend list at right side of homepage */}
                {isNonMobileScreens && 
                (
                <Box flexBasis="26%">
                    <AdvertWidget />
                    <FriendsWidget userId={_id} />
                </Box>
                )}


            </Box>

        </Box>

        
    )
}

export default HomePage;