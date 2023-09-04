import React, { useState } from "react";
import {
    VStack,
    Box,
    Text,
    Button,
    Input,
    Link as ChakraLink,
    FormControl,
    FormLabel,
    useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../modules/fetch";

const homepageStyle = {
    backgroundImage: "",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    height: "100vh",
};

const contentStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0", // Add border style here
    // width: "300px", // Adjust the width as needed
};

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogin = async () => {
        try {
            const token = await loginUser(email, password);
            window.localStorage.setItem("token", token.token);
            setIsLoggedIn(true); // Set login status to true
            navigate("/dashboard");
            toast({
                title: "Login Success",
                description: "You have successfully logged in.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            toast({
                title: "Login Failed",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleLogout = () => {
        // Handle logout logic
        window.localStorage.removeItem("token");
        setIsLoggedIn(false); // Set login status to false
        navigate("/");
    };

    return (
        <div style={homepageStyle}>
            <VStack h="100vh" justify="center" align="center">
                <Box style={contentStyle}>
                    <Text fontSize="3xl" fontWeight="bold" mb="4">
                        {isLoggedIn ? "Welcome back" : "Sign in to your account"}
                    </Text>
                    {isLoggedIn ? (
                        <Button onClick={handleLogout} colorScheme="blue">
                            Sign Out
                        </Button>
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleLogin();
                            }}
                        >
                            <FormControl isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl isRequired mt="3">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                colorScheme="blue"
                                width="100%"
                                mt="4"
                            >
                                Sign in
                            </Button>
                        </form>
                    )}
                    {!isLoggedIn && (
                        <Text fontSize="sm" mt="2">
                            New to Book Store?{" "}
                            <ChakraLink as={Link} color="blue.400" to="/register">
                                Create an account
                            </ChakraLink>
                        </Text>
                    )}
                </Box>
            </VStack>
        </div>
    );
};

export default Login;
