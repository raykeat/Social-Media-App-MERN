import FlexBetween from "components/FlexBetween.jsx";
import  { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material";

import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state/index.js";
import { useNavigate } from "react-router-dom";


const NavBar = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const navigate = useNavigate();

    //to dispatch react Redux Actions that will trigger a reducer
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user);
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

    //useTheme hook is a utility provided by Material-UI that allows you to 
    //access the current theme object in your React components
    //(theme object is set up using ThemeProvider)
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstname} ${user.lastname}`

    return (

        <FlexBetween padding="1rem 6%" backgroundColor={alt}> 

            <FlexBetween  gap="1.75rem">

                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"

                    //navigate to homepage once click on navbar
                    onClick={()=>navigate("/home")}
                    sx={{
                        "&:hover":{
                            color: primaryLight,
                            cursor: "pointer",
                        },
                    }}
                >
                    Ray's Sociopedia
                </Typography>


                {/*Conditionally render a FlexBetween component containing Search Bar
                if laptop view */}
                {isNonMobileScreen && (
                    <FlexBetween
                        backgroundColor={neutralLight}
                        borderRadius="9px" gap="3rem"
                        padding="0.1rem 1.5rem"
                    > 
                        <InputBase placeholder="Search" />
                        <IconButton>
                            <Search />
                        </IconButton>

                    </FlexBetween>
                )}


                {/*Ternary Operator to display all the icons if its laptop view,
                else if its mobile view display a drop-down menu icon */}
                {isNonMobileScreen ?(
                    <FlexBetween gap="2rem">

                        {/*Dispatch of setMode Action (defined in authslice) 
                        that triggers reducer to changes the mode from dark to light 
                        or vice versa */}
                        <IconButton onClick={()=> dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px"}} />
                            ):(
                                <LightMode sx={{ color: dark, fontSize: "25px"}}/>
                            )}
                        </IconButton>

                        <Message sx={{ fontSize: "25px "}}/>
                        <Notifications sx={{ fontSize: "25px" }}/>
                        <Help sx={{ fontSize: "25px" }}/>
                        <FormControl value={fullName}>
                            <Select 
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    padding:"0.25rem 1rem",
                                    "& .MuiSvgIcon-root:" :{
                                        pr: "0.25rem",
                                        width: "3rem"
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight
                                    }
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={()=>dispatch(setLogout())}>
                                    Log Out
                                </MenuItem>
                            </Select>

                        </FormControl>

                    </FlexBetween>):(
                    
                    <IconButton onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}> 
                        <Menu />
                    </IconButton>
                )}


                {/* Mobile View of different mobile menu icons*/ }
                {isMobileMenuToggled && !isNonMobileScreen && (
                    <Box
                        position="fixed"
                        right="0"
                        bottom="0"
                        height="100%"
                        zIndex ="10"
                        maxWidth="500px"
                        minWidth="300px"
                        backgroundColor={background}
                    >
                        {/* close icon */}
                        <Box display="flex" justifyContent="flex-end" p="1rem">
                            <IconButton
                                onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}
                            >
                                <Close />

                            </IconButton>
                        </Box>

                        {/* menu items */}
                        <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="2rem">

                        {/*Dispatch of setMode Action (defined in authslice) 
                        that triggers reducer to changes the mode from dark to light 
                        or vice versa */}
                        <IconButton onClick={()=> dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px"}} />
                            ):(
                                <LightMode sx={{ color: dark, fontSize: "25px"}}/>
                            )}
                        </IconButton>

                        <Message sx={{ fontSize: "25px "}}/>
                        <Notifications sx={{ fontSize: "25px" }}/>
                        <Help sx={{ fontSize: "25px" }}/>
                        <FormControl value={fullName}>
                            <Select 
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    padding:"0.25rem 1rem",
                                    "& .MuiSvgIcon-root:" :{
                                        pr: "0.25rem",
                                        width: "3rem"
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight
                                    }
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={()=>dispatch(setLogout())}>
                                    Log Out
                                </MenuItem>
                            </Select>

                        </FormControl>

                    </FlexBetween>

                    </Box> 
                )}

                

            </FlexBetween>
        
        </FlexBetween>
    )
};

export default NavBar;