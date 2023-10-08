import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { json, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { setLogin } from "state/index.js";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

{/*Yup is a JavaScript library that is commonly used for form validation 
in web applications, especially in combination with libraries like Formik. 
Using Yup to define a validation schema for a registration form.  */}
const registerSchema = yup.object().shape({
    firstname: yup.string().required("required"),
    lastname: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const initialValuesRegister = {
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    location:"",
    occupation:"",
    picture:"",
}

const initialValuesLogin = {
    email: "",
    password: "",
}


const Form = ()=>{

    const[pageType, setPageType] = useState("register");
    const[loginError,setLoginError] = useState();
    const[registerError,setRegisterError] = useState();
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";


    //register function
    //onSubmitProps is automatically passed as an argument to 
    //the handleSubmit function when using Formik. It's an object that 
    //contains various properties and methods that can be useful for 
    //handling the form submission process
    const register = async (values, onSubmitProps)=>{
        //creates a new instance of the FormData object, 
        //which will be used to construct the multipart/form-data payload 
        //to be sent to the server.
        const formData = new FormData();
        for (let value in values){
            //appends a key-value pair to the formData object. 
            //The value is the key (form field name), and values[value] 
            //is the corresponding value entered by the user.
            formData.append(value, values[value])
        }
        formData.append('picturepath',values.picture.name);

        //making POST request to backend HTTP endpoints using fetch
        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        )

        if (savedUserResponse.ok){
            //extracting the response data using the json() method. 
            //parsing using json() method turns response body 
            //from string to JSON object that can be accessed and manipulated
            const savedUser = await savedUserResponse.json();
            setPageType("login");
            onSubmitProps.resetForm();
            console.log(savedUser);
        } else{
            const savedUser = await savedUserResponse.json();
            setRegisterError(savedUser);
            console.log(savedUser);
        }
    };

    //login function
    const login = async(values, onSubmitProps) =>{

        //backend login function will return the user object and JWT token
        const logInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                //JSON.stringify() converts Javascript Object to JSON string,
                //which can then be included in request body of post request
                body: JSON.stringify(values),
            }
        );
        

        if (logInResponse.ok){
            const jsonresponse = await logInResponse.json()
            console.log(jsonresponse);

            onSubmitProps.resetForm();
            //dispatching the setLogin redux action, triggering redux reducer that sets the global user state and token state
            dispatch(setLogin({user:jsonresponse.user, token:jsonresponse.token}));
            navigate("/home");
        } else{
            const jsonresponse = await logInResponse.json()
            setLoginError(jsonresponse)
            console.log(jsonresponse);
        }

    }

    {/*to handle form submission when click on register/log in button */}
    const handleFormSubmit = async(values, onSubmitProps) =>{
        if (isLogin){
            await login(values, onSubmitProps);
        } else{
            await register(values, onSubmitProps);
        }

    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            //initialValues and validationSchema are built-in properties for Formik that help you manage
            //the initial state and validation of form fields. 
            initialValues={isLogin ? initialValuesLogin: initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                //Render Prop
                //In Formik, the values property represents an object that holds the current values of 
                //the form fields. Each form field corresponds to a key in the values object, 
                //and the user-entered or selected value for that field is stored as 
                //the corresponding value in the object.
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0,1fr))"
                        sx={{
                            "&>div":{gridColumn: isNonMobile ?undefined:"span4"}
                        }}
                    >
                        {/* Components to render if its register page */}
                        {isRegister && (
                            <>
                            <TextField
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstname}
                                name="firstname"
                                error={Boolean(touched.firstname) && Boolean(errors.firstname)}
                                helperText={touched.firstname && errors.firstname}
                                sx={{
                                     gridColumn: "span 2"
                                }}
                            />

                            <TextField
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastname}
                                name="lastname"
                                error={Boolean(touched.lastname) && Boolean(errors.lastname)}
                                helperText={touched.lastname && errors.lastname}
                                sx={{
                                     gridColumn: "span 2"
                                }}
                            />

                            <TextField
                                label="Location"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.location}
                                name="location"
                                error={Boolean(touched.location) && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                                sx={{
                                     gridColumn: "span 4"
                                }}
                            />

                            <TextField
                                label="Occupation"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.occupation}
                                name="occupation"
                                error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                helperText={touched.occupation && errors.occupation}
                                sx={{
                                     gridColumn: "span 4"
                                }}
                            />

                            <Box
                                gridColumn="span 4"
                                border={`1px solid ${palette.neutral.medium}`}
                                borderRadius="5px"
                                p="1rem"
                            >
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) => 
                                        setFieldValue("picture", acceptedFiles[0])
                                    }
                                >
                                    {({ getRootProps, getInputProps }) =>(
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{ "&:hover" : {cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                                <p>Add picture</p>
                                            ):(
                                                <FlexBetween>
                                                    <Typography>
                                                        {values.picture.name}
                                                    </Typography>
                                                    <EditOutlined />
                                                </FlexBetween>

                                            )}

                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>

                            </>
                            
                        )}

                        {/*Common Components of register and login page */}
                        <>
                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{
                                     gridColumn: "span 4"
                                }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{
                                     gridColumn: "span 4"
                                }}
                            />
                        </>

                    </Box>

                    {loginError && (
                        <>
                        <Typography>
                            {loginError.error}
                        </Typography>
                        </>
                    )}

                    {registerError && (
                        <>
                        <Typography>
                            {registerError.error}
                        </Typography>
                        </>
                    )}

                    {/*Button to register/login */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p:"1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            {isLogin ? "Login":"Register"}
                        </Button>

                        {/* Button to switch between login and register page */}
                        <Typography
                            onClick={()=>{
                                setPageType(pageType==="register" ?"login":"register");
                                resetForm();
                            }}
                            sx={{
                                color: palette.primary.main,
                                "&:hover": { color: palette.primary.dark }
                            }}
                        >
                            {isLogin?"Don't have an account? Sign up for an account":"Have an account? Log in here"}
                        </Typography>

                    </Box>
                </form>
            )}
        
        </Formik>
    )

}

export default Form;