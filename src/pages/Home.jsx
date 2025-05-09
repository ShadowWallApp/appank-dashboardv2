import React, { useState } from "react";
import { Button, Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import DashboardLayout from "../components/DashboardLayout";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext"; // sesuaikan path
import Tabel from "../components/Tabel";
import Dashboard from "../components/Dashboard";

function Home() {
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
 const { currentUser, logOutUser } = useAuth();


  const handleLogout = async () => {
    try {
      setLoading(true);
      await logOutUser();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case "formInput":
        return <FormInput />;
      case "tabel":
        return <Tabel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <DashboardLayout
      user={currentUser}
      onLogout={handleLogout}
      onSelectPage={setActivePage}
    >
     

      {renderPage()}
    </DashboardLayout>
  );
}

export default Home;
