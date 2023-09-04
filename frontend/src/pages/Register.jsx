import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { registerUser } from "../modules/fetch";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      await registerUser(name, email, password);
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.message || "An error occurred. Please try again.";
      toast({
        title: "An error occurred.",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="100%"
      py={4}
      px={4}
      mx="auto"
      mt={8}
      maxWidth="400px" // Adjust the maximum width as needed
    >
      <Box textAlign="center" mb={4}>
        <Text fontSize="3xl" fontWeight="bold">
          Create a New Account
        </Text>
      </Box>

      <Box borderWidth="1px" borderRadius="lg" p={4}>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="name"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          {password !== confirmPassword && (
            <Text fontSize="sm" color="red.500" mt={2}>
              Passwords do not match
            </Text>
          )}

          <Button mt={6} colorScheme="blue" type="submit" width="100%">
            Sign Up
          </Button>

          <Text mt={2} fontSize="sm" textAlign="center">
            Already have an account?{" "}
            <Link to="/" color="blue.400">
              Log In
            </Link>
          </Text>
          <Text mt={2} fontSize="sm" textAlign="center">
            By clicking Sign Up, you agree to our <a href="#">Terms</a> and
            acknowledge that you have read our <a href="#">Data Policy</a>,
            including our <a href="#">Cookie Use Policy</a>.
          </Text>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
