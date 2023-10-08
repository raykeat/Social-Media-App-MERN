import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//importing setPosts redux action, upon dispatch will trigger reducer to set global posts state
import { setPosts } from "state/index.js";
import PostWidget from "./PostWidget.jsx";


const AllPostsWidget = ({ userId, isProfile=false}) => {

    const dispatch = useDispatch();

    //getting token stored in global redux state
    const token = useSelector((state)=>state.token);
    //local allposts state to store all the posts (as global redux action and states take time to update)
    const [allPostsLocal, setAllPostsLocal] = useState([]);


    //function to retrieve all posts from all users in MongoDB 
    const retrieve_posts = async()=>{

        const response = await fetch('http://localhost:3001/posts',{
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })

        if (response.ok){
            const jsonresponse = await response.json();
            console.log(jsonresponse);
            //update global redux posts state
            dispatch(setPosts({posts: jsonresponse}));
            //update local posts state
            setAllPostsLocal(jsonresponse);

        } else{
            const jsonresponse = await response.json();
            console.log(jsonresponse);
        }
    };

    //function to retrieve a specific user's posts
    const retrieve_user_posts = async()=>{

        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })

        if (response.ok){
            const jsonresponse = await response.json();
            console.log(jsonresponse);
            //update global redux posts state
            dispatch(setPosts({posts: jsonresponse}));
            //update local posts state
            setAllPostsLocal(jsonresponse);

        } else{
            const jsonresponse = await response.json();
            console.log(jsonresponse);
        }
    };

    //useEffect hook to call retrieve_user_posts function or retrieve_posts function
    //depending on whether we are on a user's profile page or not
    useEffect(() => {
        if (isProfile){
            retrieve_user_posts();
        } else{
            retrieve_posts();
        }
    },[]);

    //getting all the posts stored in global redux state
    const allPostsGlobal = useSelector((state)=>state.posts);

    
    return(
        <>
            {allPostsLocal.map(
                ({
                    _id,
                    userId,
                    firstname,
                    lastname,
                    likes,
                    comments,
                    location,
                    description,
                    picturePath,
                    userPicturePath,
                }) => (
                    <PostWidget 
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstname} ${lastname}`}
                        likes={likes}
                        comments={comments}
                        location={location}
                        description={description}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                    />
                )
            )} 
        </>
    );
}

export default AllPostsWidget;