import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("access_token"); // token dari URL Supabase
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!password) {
      toast({
        title: "Password wajib diisi",
        status: "warning",
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      }, token);

      if (error) throw error;

      toast({
        title: "Password berhasil diubah",
        status: "success",
        isClosable: true,
      });

      navigate("/login");
    } catch (error) {
      toast({
        title: "Gagal mengubah password",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Center h="100vh">
        <Text>Token reset password tidak ditemukan.</Text>
      </Center>
    );
  }

  return (
    <Center h="100vh" p={4}>
      <Box maxW="400px" w="100%">
        <Text mb={4} fontSize="xl" fontWeight="bold">
          Reset Password
        </Text>
        <Input
          type="password"
          placeholder="Password baru"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={4}
        />
        <Button onClick={handleReset} isLoading={loading} colorScheme="teal" w="100%">
          Ubah Password
        </Button>
      </Box>
    </Center>
  );
}

export default ResetPassword;
