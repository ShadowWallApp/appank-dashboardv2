import { Box, Flex, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ children, user, onLogout, onSelectPage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Warna background utama menyesuaikan mode terang/gelap
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const bgtopbar = useColorModeValue("gray.50", "gray.900");

  return (
    <Flex minH="100vh" flexDirection={{ base: "column", md: "row" }}>
      <Sidebar onSelectPage={onSelectPage} isOpen={isOpen} onClose={onClose} />
      <Box
        flex="1"
        ml={{ base: 0, md: "200px" }} 
        p="4"
        bg={bgColor}
        shadow={"sm"}
        minH="100vh"
      >
        <Topbar bg={ bgtopbar} user={user} onOpenSidebar={onOpen} onLogout={onLogout} />
        <Box mt="4">{children}</Box>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
