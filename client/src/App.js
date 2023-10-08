import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homepage/index.jsx";
import LoginPage from "scenes/loginpage/index.jsx";
import ProfilePage from "scenes/profilepage";
import NavBar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget.jsx";

/* importing necessary components and functions from Material-UI and React Redux 
to set up and apply a custom theme. */ 
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";



function App() {

  //useSelector hook to access the mode property from the Redux store's state
  //state represents the entire Redux store state object, specifically selecting the mode property from it. 
  const mode = useSelector((state) => state.mode);


  {/* useMemo hook to create and memoize the theme based on the selected mode. 
  The [mode] dependency array specifies that the theme object should only be recalculated 
  when the mode value changes. If the mode remains the same, 
  the previously calculated theme object is returned from the memoized cache. */}
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  //isAuth is true if token exists
  const isAuth = Boolean(useSelector((state)=>state.token))

  return (
    <div className="app">

      <BrowserRouter>

        {/*Apply theme to entire application*/}
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>

            {/*Route maps specific URL paths to different React Components*/}
            <Route path="/" element={isAuth ? < HomePage /> : < LoginPage />} />
            <Route path="/navbar" element={< NavBar />} />
            
            <Route path="/userwidget" element={< UserWidget />} />
            <Route path="/login" element={< LoginPage />} />
            <Route path="/profile/:userId" element={isAuth?< ProfilePage />:<LoginPage />} />

          </Routes>

        </ThemeProvider>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
