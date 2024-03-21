import React, { Suspense, lazy, useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Lazy load the components
import HomePage from "./pages/Home";
import Cookies from "js-cookie";
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const ResourcesPage = lazy(() => import("./pages/Resources/Index"));
const ResourcePage = lazy(() => import("./pages/Resources/Show"));
const ResourceCreatePage = lazy(() => import("./pages/Resources/Create"));
const ResourceEditPage = lazy(() => import("./pages/Resources/Update"));
const ResourceDeletePage = lazy(() => import("./pages/Resources/Delete"));
const RegisterPage = lazy(() => import("./pages/Users/Register"));
const LoginPage = lazy(() => import("./pages/Users/Login"));
const ProfilePage = lazy(() => import("./pages/Users/Profile"));
const LogoutPage = lazy(() => import("./pages/Users/Logout"));

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let user = Cookies.get("user");

        if (!user) return

        user = JSON.parse(user);
        const fetchData = async () => {
            try {
                const userResp = await axios.get(`/api/users/${user.id}`);

                setUser(userResp.data);
            } catch (error) {
                Cookies.remove("user");
                setUser(null);
                return;
            }
        }

        fetchData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <Router>
                <ToastContainer />
                <Navigation />
                <Suspense fallback={<div>Loading...</div>}>
                    {" "}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/resources" element={<ResourcesPage />} />
                        <Route path="/resources/:id" element={<ResourcePage />} />
                        <Route path="/resources/create" element={<ResourceCreatePage />} />
                        <Route path="/resources/:id/update" element={<ResourceEditPage />} />
                        <Route path="/resources/:id/delete" element={<ResourceDeletePage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/logout" element={<LogoutPage />} />
                    </Routes>
                </Suspense>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
