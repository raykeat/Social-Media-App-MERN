import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],

};

/*The authSlice is a specific slice of the Redux store 
that handles the authentication-related state. It includes the initial state, 
reducer functions for various actions (e.g., login, logout), and action creators for those actions. 
The authSlice is created using the createSlice function provided by @reduxjs/toolkit */

/*In summary, the Redux store configuration involves setting up the global state management infrastructure, 
while the authSlice specifically defines the structure, behavior, 
and initial state for the authentication-related state within the Redux store. */

//Reducers will handle updating the state based on the actions dispatched.

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else{
                console.error("user friends non-existent");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id){
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;