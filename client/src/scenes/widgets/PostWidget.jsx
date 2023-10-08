import { 
    ChatBubbleOutlineOutlined, 
    FavoriteBorderOutlined, 
    FavoriteBorderOutlines,
    FavoriteOutlined,
    ShareOutlined,

} from "@mui/icons-material";

import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend.jsx";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { setPost } from "state";


const PostWidget = ({
    //props passed to the PostWidget component
    postId,
    postUserId,
    name,
    likes,
    comments,
    location,
    description,
    picturePath,
    userPicturePath,

    }) => {

        const { palette } = useTheme();
        const primary = palette.primary.main;
        const main = palette.neutral.main;


        const dispatch = useDispatch();
        const token = useSelector((state)=>state.token);
        //to determine if we keep the comments section open
        const [isComments, setIsComments] = useState(false);
        const loggedInUserId = useSelector((state)=>state.user._id);

        //to determine if current logged in user has liked the post INITIALLY
        const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]));
        const [likeCount, setLikeCount] = useState(Object.keys(likes).length);


        //function to like/unlike post
        const updateLikes = async() => {

            const response = await fetch(`http://localhost:3001/posts/${postId}/like`,{
                method: "PATCH",
                headers: { 
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json",
                },
                //JSON.stringify() converts Javascript Object to JSON string,
                //which can then be included in request body of request
                body: JSON.stringify({userId: loggedInUserId}),
            });

            const updatedPost = await response.json();
            if (response.ok) {
                console.log(updatedPost);
                //dispatching the setPost action, triggering reducer that updates the 
                //post that was just liked/unliked in the global redux posts state
                dispatch(setPost({ post_id: updatedPost._id, post: updatedPost}));

                //updating isLiked and likeCount states
                setIsLiked(Boolean(updatedPost.likes[loggedInUserId]));
                setLikeCount(Object.keys(updatedPost.likes).length);

            }
            else{
                console.log(`Error: ${updatedPost}`);
            }
        };
        

        return (
            <WidgetWrapper m="2rem 0">
                
                {/*Friend component for person who posted the post */}
                <Friend
                    friendId = {postUserId}
                    name={name}
                    subtitle = {location}
                    userPicturePath={userPicturePath}
                />

                <Typography color={main} sx={{ mt: "1rem"}}>
                    {description}
                </Typography>

                {/* display image if post has an image */}
                {picturePath && (
                    <img 
                        width="100%"
                        height="auto" 
                        alt="post"  
                        style={{ borderRadius: "0.75rem", marginTop: "0.75rem"}}
                        src={`http://localhost:3001/assets/${picturePath}`}
                    />
                )}

                
                <FlexBetween mt="0.25rem">

                    <FlexBetween gap="1rem">

                        {/*Button for current user to like/unlike post, and typography to display like count */}
                        <FlexBetween gap="0.3rem">
                            <IconButton onClick={updateLikes}>
                                {isLiked ? (
                                    <FavoriteOutlined sx={{ color: primary}} />
                                ) : (
                                    <FavoriteBorderOutlined sx={{ color: primary}} />
                                )}
                            </IconButton>

                            <Typography>{likeCount}</Typography>
                        </FlexBetween>


                        {/*Button to toggle whether or not to show comments */}
                        <FlexBetween>
                            <IconButton onClick={()=>setIsComments(!isComments)}>
                               <ChatBubbleOutlineOutlined />
                            </IconButton>

                            <Typography>{comments.length}</Typography>
                        </FlexBetween>

                    </FlexBetween>

                    
                    {/*To share the post */}
                    <IconButton>
                        <ShareOutlined />
                    </IconButton>

                </FlexBetween>

                {/*To display post comments */}
                {isComments && (
                    <Box mt="0.5rem">
                        {comments.map((comment,index) => (
                            <Box key={`${name} ${index}`}>
                                <Divider />
                                <Typography sx={{ color: main, m:"0.5rem 0", pl:"1rem" }}>
                                    {comment}
                                </Typography>
                            </Box>
                        ))}
                        <Divider />
                        
                    </Box>
                )}
                

            </WidgetWrapper>
        )
    };

export default PostWidget;