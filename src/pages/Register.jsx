import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // Warna yang responsif terhadap dark mode
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "white");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const bgOuter = useColorModeValue("gray.50", "gray.900");
  const linkColor = useColorModeValue("blue", "white");

  const handleRegister = async () => {
    if (!email || !password || !displayName) {
      toast({
        title: "Semua field wajib diisi ya",
        status: "warning",
        position: "top",
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://dashboardv2-production.up.railway.app/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, nama: displayName }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registrasi gagal");
      }

      toast({
        title: "Registrasi berhasil",
        description: "Silakan cek email Anda untuk verifikasi.",
        status: "success",
        position: "top",
        isClosable: true,
      });

      // Redirect ke halaman login atau verifikasi email
      navigate("/login");
    } catch (err) {
      toast({
        title: "Gagal registrasi",
        description: err.message,
        status: "error",
        position: "top",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center w="100%" h="100dvh" bg={bgOuter} px="10px">
      <Box
        bg={bgColor}
        w="100%"
        maxW="400px"
        p="6"
        boxShadow="md"
        borderRadius="md"
        border="1px solid #ccc"
      >
        <Flex flexDir="column" gap="20px">
          <Text fontSize="2xl" textAlign="center" color={textColor}>
            Register Akun
          </Text>
          <Input
            bg={inputBg}
            placeholder="Nama Lengkap"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            color={textColor}
          />
          <Input
            bg={inputBg}
            placeholder="Email"
            type="email"
            value={email}
            color={textColor}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            bg={inputBg}
            placeholder="Password"
            type="password"
            value={password}
            color={textColor}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button colorScheme="teal" onClick={handleRegister} isLoading={isLoading}>
            Register
          </Button>
          <Text color={"gray.600"}>
            Sudah punya akun?{" "}
            <a href="/login" style={{ color: linkColor }}>
              Login
            </a>
          </Text>
        </Flex>
      </Box>
    </Center>
  );
}

export default Register;
