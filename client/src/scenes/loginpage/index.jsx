import {
    Box,
    Typography,
    useTheme,
    useMediaQuery
} from "@mui/material";
import Form from "./Form.jsx";


const LoginPage = () => {
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light
    const alt = theme.palette.background.alt;
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

    return (
        <Box width="100%" backgroundColor={alt} p="1rem 6%" textAlign="center">
            <Box>
                <Typography
                        fontWeight="bold"
                        fontSize="32px"
                        color="primary"

                        sx={{
                            "&:hover":{
                                color: primaryLight,
                                cursor: "pointer",
                            },
                        }}
                    >
                        Ray's Sociopedia
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreen ? "50%" : "90%"}
                padding="2rem"
                margin="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={alt}
            >
                <Typography
                    fontWeight="500"
                    sx={{
                        mb: "1.5rem"
                    }}
                >
                    Welcome to Sociopedia Julia
                </Typography>

                <Form />
            </Box>
        </Box>

    )
}

export default LoginPage;