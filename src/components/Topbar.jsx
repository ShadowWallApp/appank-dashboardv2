import React from "react";
import {
  Flex,
  IconButton,
  Text,
  Avatar,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { LuMoon, LuSun } from "react-icons/lu";
import { useAuth } from "../context/AuthContext"; // sesuaikan path

const Topbar = ({ onOpenSidebar }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { currentUser, logOutUser } = useAuth();
  const { toggleColorMode, colorMode } = useColorMode();

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "white");
  const iconColor = useColorModeValue("gray.600", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const displayName =
    currentUser?.profile?.nama || // jika Anda simpan nama di tabel profile
    currentUser?.email || // fallback ke email
    "User";

  return (
    <Flex
      justify="space-between"
      align="center"
      mb={4}
      px={4}
      py={3}
      bg={bgColor}
      color={textColor}
      borderRadius="lg"
      boxShadow="sm"
      w="100%"
      border="1px solid"
      borderColor={borderColor}
    >
      <Flex align="center" gap={3}>
        {isMobile && (
          <IconButton
            icon={<Icon as={FiMenu} boxSize={5} stroke={iconColor} />}
            onClick={onOpenSidebar}
            aria-label="Open Menu"
            variant="ghost"
            size="sm"
          />
        )}
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          color={useColorModeValue("teal.600", "teal.200")}
        >
          My Dashboard
        </Text>
      </Flex>

      <Flex align="center" gap={{ base: 2, md: 4 }}>
        {!isMobile && (
          <IconButton
            onClick={toggleColorMode}
            icon={
              <Icon
                as={colorMode === "light" ? LuMoon : LuSun}
                stroke={iconColor}
                boxSize={5}
              />
            }
            aria-label="Toggle color mode"
            variant="ghost"
            size="sm"
          />
        )}
        {!isMobile && <Text color={textColor}>{displayName}</Text>}
        <Avatar size="sm" name={displayName} />
        <Button colorScheme="red" size="sm" onClick={logOutUser} variant="outline">
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Topbar;
