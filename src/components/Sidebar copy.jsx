import {
  Box,
  VStack,
  Text,
  Icon,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  useColorModeValue,
} from "@chakra-ui/react";
//import { FiHome, FiUser, FiSettings, FiTable } from "react-icons/fi"; (Recomended)
//import { HiOutlineTableCells } from "react-icons/hi2"; (Recomended)
import { LuLayoutDashboard, LuFileInput, LuTableProperties } from "react-icons/lu";


const Sidebar = ({ isOpen, onClose, onSelectPage }) => {
  const bgSidebar = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headerColor = useColorModeValue("teal.500", "teal.300");

  return (
    <>
      {/* Sidebar Desktop */}
      <Box
        w="200px"
        bg={bgSidebar}
        color="gray.800"
        h="100vh"
        p="6"
        mb="10"
py="3"
px="4"
spacing="4"
        pos="fixed"
        display={{ base: "none", md: "block" }}
        boxShadow="md"
        borderRight="1px solid"
        borderColor={borderColor}
      >
        <Text fontSize="2xl" fontWeight="bold" mb="10" color={headerColor}>
          AppankDev
        </Text>
        <SidebarContent onItemClick={onSelectPage} />
      </Box>

      {/* Drawer Mobile */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          w="200px"
          bg={bgSidebar}
          color="gray.800"
          borderRightRadius="xl"
          boxShadow="2xl"
        >
          <DrawerHeader borderBottomWidth="1px" fontWeight="bold" color={headerColor}>
           AppankDev
          </DrawerHeader>
          <DrawerBody p="6">
            <SidebarContent
              onItemClick={(label) => {
                onSelectPage(label);
                onClose();
              }}
            />
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const SidebarContent = ({ onItemClick = () => {} }) => (
  <VStack align="start" spacing="1" w="full">
    <SidebarItem icon={LuLayoutDashboard} label="Dashboard" onClick={() => onItemClick("dashboard")} />
    <SidebarItem icon={LuFileInput} label="Input Data" onClick={() => onItemClick("formInput")} />
    <SidebarItem icon={LuTableProperties} label="Tabel" onClick={() => onItemClick("tabel")} />
  </VStack>
);

const SidebarItem = ({ icon, label, onClick }) => {
  const iconColor = useColorModeValue("gray.600", "gray.300");
  const textColor = useColorModeValue("gray.700", "gray.400");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      w="full"
      px="4"
      py="3"
      borderRadius="md"
      display="flex"
      alignItems="center"
      gap="3"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        bg: hoverBg,
        boxShadow: "sm",
        transform: "translateX(4px)",
      }}
      onClick={onClick}
    >
    <Box
    as={icon}
    boxSize={5}
    stroke={iconColor} // <== ini kunci pentingnya!
  />
      <Text fontSize="md" fontWeight="medium" color={textColor}>
        {label}
      </Text>
    </Box>
  );
};

export default Sidebar;
