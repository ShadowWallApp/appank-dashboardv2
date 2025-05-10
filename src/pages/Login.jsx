import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  // Warna yang responsif terhadap dark mode
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "white");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const bgOuter = useColorModeValue("gray.50", "gray.900");
  const linkColor = useColorModeValue("blue", "white");

  const toastBg = useColorModeValue("white", "gray.700");
  const toastTextColor = useColorModeValue("gray.800", "white");
  const toastSuccessBorder = useColorModeValue("green.500", "green.300");
  const toastErrorBorder = useColorModeValue("red.500", "red.300");

  // Cek apakah sudah login dengan token di localStorage
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Jika sudah ada token, redirect ke homepage (atau halaman lain)
      navigate("/");
    }
  }, [navigate]);

  const handleLoginWithEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Login gagal");

      // Simpan token
      localStorage.setItem("access_token", result.session.access_token);

      // Update state currentUser di Context supaya UI langsung update
      setCurrentUser(result.user);

      toast({
        title: "Login berhasil",
        status: "success",
        position: "top",
        isClosable: true,
      });

      navigate("/");
    } catch (err) {
      toast({
        title: "Login gagal",
        description: err.message,
        status: "error",
        position: "top",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center w="100%" h="100dvh" bg={bgOuter} px="10px">
      <Box
        bg={bgColor}
        color={textColor}
        p={8}
        borderRadius="lg"
        boxShadow="md"
        w="100%"
        maxW="400px"
        borderColor={borderColor}
      >
        <Flex flexDir="column" gap="20px">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color={textColor}>
            Login
          </Text>
          <Input
            bg={inputBg}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            color={textColor}
          />
          <Input
            bg={inputBg}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            color={textColor}
          />
          <Button isLoading={loading} onClick={handleLoginWithEmail} colorScheme="teal">
            Login
          </Button>
          <Text fontSize="sm" textAlign="right" color="gray.600">
            Lupa Kata Sandi?{" "}
            <a href="/reset-password" style={{ color: linkColor }}>
              Reset Password
            </a>
          </Text>
          <Flex my="1px" align="center">
            <Divider />
            <Text px="10px" fontSize="sm" color="gray.500">
              OR
            </Text>
            <Divider />
          </Flex>

          <Flex gap={3}>
            <Button
              flex={1}
              leftIcon={<i className="ci ci-google"></i>}
              boxShadow="md"
              bg="white"
              color="black"
              border="1px solid #ccc"
              // onClick={() => signInWithOAuth("google")}
            >
              Google
            </Button>

            <Button
              flex={1}
              leftIcon={<i className="ci ci-facebook"></i>}
              boxShadow="md"
              bg="#1877F2"
              color="white"
              border="1px solid #ccc"
              // onClick={() => signInWithOAuth("facebook")}
            >
              Facebook
            </Button>
          </Flex>

          <Text fontSize="sm" textAlign="center" color="gray.600">
            Belum punya akun?{" "}
            <a href="/register" style={{ color: linkColor }}>
              Daftar
            </a>
          </Text>
        </Flex>
        <Text
          fontSize="xs"
          fontStyle="italic"
          color="gray.600"
          textAlign="center"
          p={2}
        >
          © 2025 All rights reserved .by{" "}
          <a
            href="https://appank-dev.vercel.app/"
            style={{ color: "#3182ce", textDecoration: "none" }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            target="_blank"
            rel="noopener noreferrer"
          >
            AppankDev
          </a>
        </Text>
      </Box>
    </Center>
  );
}

export default Login;
