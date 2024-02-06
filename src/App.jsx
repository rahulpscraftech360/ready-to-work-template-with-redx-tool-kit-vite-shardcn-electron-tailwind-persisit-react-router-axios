import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import Login from "./pages/Login"; // Make sure you have a Login component
import "./style.css";

function App() {
  const [value, setValue] = useState(null);
  const isOrganizationLoggedIn = useSelector(
    (state) => state.organizationSlice.isOrganizationLoggedIn
  );

  console.log("is", value);
  useEffect(() => {
    setValue(isOrganizationLoggedIn);
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModeToggle />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                isOrganizationLoggedIn ? (
                  <Home />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route path="/login" element={<Login />} />

            {isOrganizationLoggedIn && (
              <Route path="/home" element={<Home />} />
            )}
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

// <Routes>
// {/* Redirect based on the organization's presence in the store */}
// <Route
//   path="/"
//   element={
//     isOrganizationLoggedIn ? (
//       <Home />
//     ) : (
//       <Navigate replace to="/login" />
//     )
//   }
// />
// <Route path="/login" element={<Login />} />
// {/* Assuming you have a Login component for the login path */}
// {/* Add more routes as needed */}
// </Routes>
