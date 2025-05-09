
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
  VStack,
  Link,
} from "@chakra-ui/react";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";

const Tabel = () => {
  const [activePage, setActivePage] = useState(1);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const iconColor = useColorModeValue("gray.600", "gray.200");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonTextColor = useColorModeValue("gray.800", "gray.200");

  const pageSize = 15;
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
    maxW="100%"
    minH="auto"
    transition="all 0.3s ease"
    >
      {/* Breadcrumb hanya tampil di desktop */}
      {!isMobile && (
        <Breadcrumb
          separator={
            <Box as="span" color="gray.600" fontWeight="bold">
              /
            </Box>
          }
          mb={4}
        >
          <BreadcrumbItem>
            <BreadcrumbLink color="gray.600" href="#">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="gray.600">Tabel</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )}

      <Box mb={4} p={2}>
        {/* Alert */}
        <Alert
          status="info"
          maxHeight="auto"
          borderRadius="md"
          flexDirection="column"
          alignItems="flex-start"
          pb={4}
        >
          <Flex alignItems="center" mb={2}>
            <AlertIcon boxSize={5} mr={2} color={iconColor} />
            <AlertTitle color={iconColor} fontSize="lg">
              Information:
            </AlertTitle>
          </Flex>
          <AlertDescription color={iconColor} mt={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </AlertDescription>
        </Alert>
      </Box>

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
       // minH="300px"
        minH="auto" // Gunakan auto untuk mobile agar lebih rapi
        maxW="auto"
        transition="all 0.3s ease"
      >
        {!isMobile ? (
          // Tampilan Desktop: Tabel
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
                    ${item.price.toFixed(2)}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          // Tampilan Mobile: Daftar
          <VStack spacing={4} align="stretch">
            {paginatedItems.map((item) => (
              <Box
                key={item.id}
                p={4}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="md"
                bg={bgColor}
                boxShadow="sm"
              >
                <Text fontWeight="bold" color={textColor}>
                  {item.name}
                </Text>
                <Text fontSize="sm" color={textColor}>
                  Category: {item.category}
                </Text>
                <Text fontSize="sm" color={textColor} textAlign="right">
                  Price: ${item.price.toFixed(2)}
                </Text>
              </Box>
            ))}
          </VStack>
        )}

        {/* Pagination Controls */}
        <ButtonGroup
          color={iconColor}
          size="sm"
          spacing={1}
          mt={4}
          p={2}
          justifyContent="center"
          display={isMobile ? "flex" : "inherit"} // Gunakan flex untuk mobile agar lebih rapi
        >
          <IconButton
            icon={<LuChevronLeft />}
            onClick={handlePrev}
            bg="blue.600"
            isDisabled={activePage === 1}
            aria-label="Previous page"
            variant="ghost"
            size="sm"
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
                size="sm"
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
            size="sm"
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
            href="https://appank-dev.vercel.app/"
            color="blue.500"
            _hover={{ textDecoration: "underline", color: "blue.600" }}
            isExternal
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

export default Tabel;