"use client";

import {
  Box,
  Flex,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  useBreakpointValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonGroup,
  IconButton,
  Button,
  SimpleGrid,
  Image,
  Link,
} from "@chakra-ui/react";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";

const Dashboard = () => {
  const [activePage, setActivePage] = useState(1);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const iconColor = useColorModeValue("gray.600", "gray.200");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonTextColor = useColorModeValue("gray.800", "gray.200");

  const pageSize = 5;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedItems = items.slice(
    (activePage - 1) * pageSize,
    activePage * pageSize
  );

  const handlePrev = () => {
    if (activePage > 1) setActivePage(activePage - 1);
  };

  const handleNext = () => {
    if (activePage < totalPages) setActivePage(activePage + 1);
  };

  const handlePageChange = (pageNum) => {
    setActivePage(pageNum);
  };

  return (
    <Flex
      mx="auto"
      direction="column"
      mt="6"
      transition="all 0.3s ease"
    >
        <Box pb={5}>
      {/* Breadcrumb hanya tampil di desktop */}
      {!isMobile && (
        <Breadcrumb>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="gray.600">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )}
    </Box>
   <Box  pb={5}>
        {/* Alert */}
        <Alert
  status="info"
  maxHeight="auto"
  borderRadius="md"
  flexDirection="column" // Mengatur tata letak vertikal
  alignItems="flex-start" // Menyelaraskan konten ke kiri
  p={4} // Menambahkan padding untuk estetika
>
  <Flex alignItems="center" mb={2}> {/* Membungkus AlertIcon dan AlertTitle */}
    <AlertIcon boxSize={5} color={iconColor} />
    <AlertTitle color={iconColor} fontSize="lg">
      Information:
    </AlertTitle>
  </Flex>
  <AlertDescription color={iconColor} mt={2}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </AlertDescription>
</Alert>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
        {/* Item 1 */}
        <Box
          textAlign="left"
          p={6}
          bg={bgColor}
          boxShadow="md"
          borderRadius="xl"
          mb={4}
          _hover={{ boxShadow: "xl", transform: "scale(1.03)", transition: "0.3s" }}
        >
          <Image
            src="https://raw.githubusercontent.com/dheereshagrwal/coloured-icons/ef59ea8e2bba5848a8f471f94b24f55289c86476/public/logos/technology/google/google.svg"
            alt="Google"
            boxSize="80px"
            mx="inherit"
            mb={4}
          />
          <Text fontSize="xl" fontWeight="bold" color="teal.600">
           Client 0Auth2
          </Text>
          <Text mt={2} fontSize="sm" color="gray.500">
          Google 0Auth2 Sebagai Authentikasi User 
          </Text>
        </Box>

        {/* Item 2 */}
        <Box
         textAlign="left"
         p={6}
         bg={bgColor}
         boxShadow="md"
         borderRadius="xl"
         mb={4}
         _hover={{ boxShadow: "xl", transform: "scale(1.03)", transition: "0.3s" }}
        >
          <Image
            src="https://raw.githubusercontent.com/dheereshagrwal/coloured-icons/bc82276a7ea47630ae52edd6137e58da18cfedce/public/logos/technology/supabase/supabase.svg"
            alt="Supabase"
            boxSize="80px"
            mx="inherit"
            mb={4}
          />
          <Text fontSize="xl" fontWeight="bold" color="teal.600">
          Supabase
          </Text>
          <Text mt={2} fontSize="sm" color="gray.500">
             Authentikasi User dibuat menggunakan Supabase
          </Text>
        </Box>

        {/* Item 3 */}
        <Box
          textAlign="left"
          p={6}
          bg={bgColor}
          boxShadow="md"
          borderRadius="xl"
          mb={4}
          _hover={{ boxShadow: "xl", transform: "scale(1.03)", transition: "0.3s" }}
        >
          <Image
            src="https://raw.githubusercontent.com/dheereshagrwal/coloured-icons/bc82276a7ea47630ae52edd6137e58da18cfedce/public/logos/technology/chakraui/chakraui.svg"
            alt="Chakra UI"
            boxSize="80px"
            mx="inherit"
            mb={4}
          />
          <Text fontSize="xl" fontWeight="bold" color="teal.600">
            Chakra Ui
          </Text>
          <Text mt={2} fontSize="sm" color="gray.500">
            Stayle ini dibuat menggunakan Chakra UI V2.10.7
          </Text>
        </Box>
      </SimpleGrid>

      <Box height="10px" />
      <Box mb={4} p={2}>
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          Tabel Data
        </Text>
      </Box>

      <Box
       bg={bgColor}
       color={textColor}
       p="20px"
       borderRadius="lg"
       boxShadow="sm"
       border="1px solid"
       borderColor={borderColor}
       minH="300px"
       maxW="auto"
       overflowY="auto" // Aktifkan scroll vertikal jika konten melebihi maxHeight
       transition="all 0.3s ease"
      >
        <Table size="sm" variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th color={textColor}>Product</Th>
              <Th color={textColor}>Category</Th>
              <Th textAlign="end" color={textColor}>
                Price
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedItems.map((item) => (
              <Tr key={item.id}>
                <Td color={textColor}>{item.name}</Td>
                <Td color={textColor}>{item.category}</Td>
                <Td color={textColor} textAlign="end">
                  {item.price}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Pagination Controls */}
        <ButtonGroup
          color={iconColor}
          size="sm" // Ubah dari md ke sm untuk tombol lebih kecil
    spacing={1} // Kurangi jarak antar tombol
          mt={4}
          p={2}
          justifyContent="center"
          display="inherit"
        >
          <IconButton
            icon={<LuChevronLeft />}
            onClick={handlePrev}
            bg="blue.600"
            isDisabled={activePage === 1}
            aria-label="Previous page"
            variant="ghost"
          />
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNum) => (
              <Button
                key={pageNum}
                variant={pageNum === activePage ? "solid" : "ghost"}
                onClick={() => handlePageChange(pageNum)}
                aria-label={`Page ${pageNum}`}
                color={pageNum === activePage ? "white" : buttonTextColor}
                bg={pageNum === activePage ? "blue.500" : "transparent"}
                _hover={{
                  bg: pageNum === activePage ? "blue.600" : "gray.100",
                }}
              >
                {pageNum}
              </Button>
            )
          )}
          <IconButton
            icon={<LuChevronRight />}
            onClick={handleNext}
            color={iconColor}
            isDisabled={activePage === totalPages}
            aria-label="Next page"
            bg="blue.600"
            variant="ghost"
          />
        </ButtonGroup>
      </Box>

      <Box mb={4} p={2}>
  <Text
    fontSize="xs"
    fontStyle="italic"
    color="gray.600"
    textAlign="center"
  >
    © 2025 All rights reserved .by{" "}
    <Link
      href="https://appankdev.vercel.app/" // Ganti dengan URL yang diinginkan
      color="blue.500"
      _hover={{ textDecoration: "underline", color: "blue.600" }}
      isExternal // Tambahkan ini jika link eksternal
    >
      AppankDev
    </Link>
  </Text>
</Box>
    </Flex>
  );
};

const items = [
  { id: 1, name: "Smart TV", category: "Electronics", price: 599.99 },
  { id: 2, name: "Espresso Machine", category: "Home Appliances", price: 79.99 },
  { id: 3, name: "Bookshelf", category: "Furniture", price: 120.0 },
  { id: 4, name: "Wireless Mouse", category: "Accessories", price: 29.99 },
  { id: 5, name: "Quantum Gadget", category: "Dsds", price: 1499.95 },
  { id: 6, name: "Gaming Laptop", category: "Electronics", price: 1299.99 },
  { id: 7, name: "Toaster Oven", category: "Home Appliances", price: 39.99 },
  { id: 8, name: "Dining Table", category: "Furniture", price: 250.0 },
  { id: 9, name: "Bluetooth Earbuds", category: "Accessories", price: 89.99 },
  { id: 10, name: "Mystic Orb", category: "Dsds", price: 799.93 },
  { id: 11, name: "Smartphone Pro", category: "Electronics", price: 899.99 },
  { id: 12, name: "Air Fryer", category: "Home Appliances", price: 99.99 },
  { id: 13, name: "Office Chair", category: "Furniture", price: 180.0 },
  { id: 14, name: "Smart Watch", category: "Accessories", price: 249.99 },
  { id: 15, name: "Gizmo X", category: "Dsds", price: 999.97 },
  { id: 16, name: "Tablet", category: "Electronics", price: 349.99 },
  { id: 17, name: "Blender", category: "Home Appliances", price: 59.99 },
  { id: 18, name: "Sofa Bed", category: "Furniture", price: 450.0 },
  { id: 19, name: "USB-C Hub", category: "Accessories", price: 49.99 },
  { id: 20, name: "Enigma Device", category: "Dsds", price: 1199.94 },
  { id: 21, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 22, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 23, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 24, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 25, name: "Headphones", category: "Accessories", price: 199.99 },
  { id: 26, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 27, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 28, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 29, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 30, name: "Headphones", category: "Accessories", price: 199.99 },
];

export default Dashboard;
