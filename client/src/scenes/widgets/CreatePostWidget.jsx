import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";

import { Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery } from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";


const CreatePostWidget = ({ picturePath }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(true);
    const [image, setImage] = useState(null);
    const [postDescription, setPostDescription] = useState("");
    const [createPostError, setCreatePostError] = useState();
    const { palette } = useTheme();
    const { _id } = useSelector((state)=>state.user);
    const token = useSelector((state)=>state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;


    //function that sends fetch request to backend to create post
    const createPost = async() => {

        //creates instance of FormData object and fills it with values of form fields
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", postDescription)
        if (isImage){
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
        
        //fetch request to backend to create post, return a response of all the updated posts objects
        const response = await fetch('http://localhost:3001/posts',{
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });


        if (response.ok){
            const jsonresponse = await response.json();
            console.log(jsonresponse);
            console.log(image.name);

            //dispatching the setPosts Redux action, triggering a reducer that sets the global posts state
            await dispatch(setPosts( {jsonresponse} ));
            //reset the Image and PostDescription state
            setImage(null);
            setPostDescription("");
            window.location.reload();
        } 
        else{
            const jsonresponse = await response.json();
            console.log(jsonresponse);
            setCreatePostError(jsonresponse.error);
        }
    }

    return(
        <WidgetWrapper>
            {/*Post Description and user profile pic */}
            <FlexBetween>
                <UserImage image={picturePath} />
                <InputBase 
                    placeholder="What's on your mind?"
                    onChange={(e) => setPostDescription(e.target.value)}
                    value = {postDescription}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>

            {/*Dropzone for image */}
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => 
                            setImage(acceptedFiles[0])
                        }
                    >

                        {({ getRootProps, getInputProps }) =>(
                            <FlexBetween>
                            <Box
                                {...getRootProps()}
                                border={`2px dashed ${palette.primary.main}`}
                                p="1rem"
                                width="100%"
                                sx={{ "&:hover" : {cursor: "pointer" } }}
                            >
                                <input {...getInputProps()} />
                                {!image ? (
                                    <p>Add picture</p>
                                ):(
                                    <FlexBetween>
                                        <Typography>
                                            {image.name}
                                        </Typography>
                                        <EditOutlined />
                                    </FlexBetween>

                                )}

                            </Box>

                            {/*Option to delete image if user has uploaded image to dropzone */}
                            {image && (
                                <IconButton
                                    onClick={() => setImage(null)}
                                    sx={{ width: "15%" }}
                                >
                                    <DeleteOutlined />
                                </IconButton>
                            )}

                            </FlexBetween>
                        )}
                    
                    </Dropzone>

                </Box>
            )}

            <Divider sx={{margin: "1.25rem 0"}} />


            {/* Remaining Icons */}
            <FlexBetween>

                {/*Icon to choose whether or not to upload image */}
                <FlexBetween gap="0.25rem" onClick={()=>setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }}/>
                    <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium }}}>
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobileScreens? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}> Clip </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}> Attachment </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}> Audio </Typography>
                        </FlexBetween>
                    </>

                ):(
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }}/>
                    </FlexBetween>
                )}

                {/*Submit button to actually create post */}
                <Button
                    onClick={createPost}
                    //button cannot be submitted if postDescription is null
                    disabled = {!postDescription}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                    }}
                >
                    POST
                </Button>

            </FlexBetween>

            {/* Create Post Error Message if there is one */}
            {createPostError && (
                <Typography>
                    {createPostError}
                </Typography>
            )}

        </WidgetWrapper>  
    );
}

export default CreatePostWidget;
