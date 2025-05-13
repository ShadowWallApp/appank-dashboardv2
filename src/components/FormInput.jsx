import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  useBreakpointValue,
  color,
} from "@chakra-ui/react";
import { useState } from "react";

const YourComponent = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    work: "",
    date: "",
    tlp_number: "",
    category: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    category:  "  "  ,
    date: "",
  });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const categories = [
    "Electronics",
    "Home Appliances",
    "Furniture",
    "Accessories",
    "Dsds",
  ];

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
  };

  const validateCategory = (category) => {
    return category ? "" : "Category is required";
  };

  const validateDate = (date) => {
    if (!date) return "";
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today ? "Date cannot be in the past" : "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value),
      }));
    }
    if (name === "category") {
      setErrors((prev) => ({
        ...prev,
        category: validateCategory(value),
      }));
    }
    if (name === "date") {
      setErrors((prev) => ({
        ...prev,
        date: validateDate(value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const categoryError = validateCategory(formData.category);
    const dateError = validateDate(formData.date);
    setErrors({ email: emailError, category: categoryError, date: dateError });

    if (emailError || categoryError || dateError) {
      alert(dateError || "Please fix the errors in the form");
      return;
    }

    console.log("Form submitted:", formData);
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      work: "",
      date: "",
      tlp_number: "",
      category: "",
      address: "",
    });
    setErrors({ email: "", category: "", date: "" });
  };

  const handleClear = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      work: "",
      date: "",
      tlp_number: "",
      category: "",
      address: "",
    });
    setErrors({ email: "", category: "", date: "" });
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
            <BreadcrumbLink color="gray.600">Input Data</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )}

      <Box mb={4} p={2}>
        <Text
          fontSize={isMobile ? "xl" : "2xl"}
          fontWeight="bold"
          color={textColor}
        >
          Input Data
        </Text>
      </Box>

      <Box
        bg={bgColor}
        color={textColor}
        p={isMobile ? "15px" : "20px"}
        borderRadius="lg"
        boxShadow="sm"
        border="1px solid"
        borderColor={borderColor}
        minH="auto"
        maxW="100%"
        transition="all 0.3s ease"
      >
        <Flex
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? 0 : 4}
        mb="15px"
        >
          <FormControl mb="15px">
            <FormLabel  color={textColor}>First Name</FormLabel>
            <Input
              bg={inputBg}
              name="first_name"
              value={formData.first_name}
              placeholder="First Name"
              onChange={handleInputChange}
              color={textColor}
              maxWidth="auto"
            />
          </FormControl>
          <FormControl  >
            <FormLabel  color={textColor}>Last Name</FormLabel>
            <Input
              bg={inputBg}
              name="last_name"
              value={formData.last_name}
              placeholder="Last Name"
              onChange={handleInputChange}
              color={textColor}
              maxWidth="auto"
            />
          </FormControl>
        </Flex>
        <Flex
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? 0 : 4}
          mb="15px"
        >
          <FormControl mb="15px" isInvalid={!!errors.email}>
            <FormLabel color={textColor}>
              Email{" "}
              <Box as="span" color="red.500" fontWeight="bold">
                *
              </Box>
            </FormLabel>
            <Input
              bg={inputBg}
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleInputChange}
              color={textColor}
              maxWidth="auto"
            />
            {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
          </FormControl>
          <FormControl>
            <FormLabel color={textColor}>Work</FormLabel>
            <Input
              bg={inputBg}
              name="work"
              value={formData.work}
              placeholder="Your Job"
              onChange={handleInputChange}
              color={textColor}
              maxWidth="auto"
            />
          </FormControl>
        </Flex>
        <Flex
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? 0 : 4}
          mb="15px"
        >
          <FormControl mb="15px" isInvalid={!!errors.date}>
            <FormLabel color={textColor}>Date</FormLabel>
            <Input
              bg={inputBg}
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              color={textColor}
              maxWidth={isMobile ? "100%" : "400px"}
            />
            {errors.date && <FormErrorMessage>{errors.date}</FormErrorMessage>}
          </FormControl>
          <FormControl>
            <FormLabel color={textColor}>Telephone Number</FormLabel>
            <Input
              bg={inputBg}
              name="tlp_number"
              value={formData.tlp_number}
              placeholder="Telephone Number"
              onChange={handleInputChange}
              color={textColor}
              maxWidth="auto"
            />
          </FormControl>
        </Flex>
        <Flex
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? 0 : 4}
          mb="15px"
        >
          <FormControl mb="15px" isInvalid={!!errors.category}>
            <FormLabel color={textColor}>
              Category{" "}
              <Box as="span" color="red.500" fontWeight="bold">
                *
              </Box>
            </FormLabel>
            <Select
              bg={inputBg}
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              color={textColor}
              maxWidth={isMobile ? "100%" : "400px"}
              placeholder="Select category"
              sx={{
                option: {
                  color: textColor, // Atur warna teks untuk opsi dropdown
                  backgroundColor: bgColor,
                },
              }}
            >
              {categories.map((cat)  => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            {errors.category && (
              <FormErrorMessage>{errors.category}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormLabel color={textColor}>Address</FormLabel>
            <Input
              bg={inputBg}
              name="address"
              value={formData.address}
              placeholder="Address"
              onChange={handleInputChange}
              color={textColor}
              maxWidth="auto"
            />
          </FormControl>
        </Flex>
        <Flex gap={2} flexDirection={isMobile ? "column" : "row"}>
          <Button
            colorScheme="teal"
            onClick={handleSubmit}
            width={isMobile ? "100%" : "auto"}
            size={isMobile ? "lg" : "md"}
          >
            Submit
          </Button>
          <Button
            variant="outline"
            colorScheme="teal"
            onClick={handleClear}
            width={isMobile ? "100%" : "auto"}
            size={isMobile ? "lg" : "md"}
          >
            Clear
          </Button>
        </Flex>
      </Box>

      
        <Text
          fontSize="xs"
          fontStyle="italic"
          color="gray.600"
          textAlign="center"
          p={5}
        >
          © 2025 All rights reserved .by{" "}
          <a
            href="https://appankdev.vercel.app/"
            style={{ color: "#3182ce", textDecoration: "none" }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            target="_blank"
            rel="noopener noreferrer"
          >
            AppankDev
          </a>
        </Text>
    </Flex>
  );
};

export default YourComponent;
