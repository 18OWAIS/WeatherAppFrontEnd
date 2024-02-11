import React from 'react';
import {  Tooltip, Button, Box, Text } from '@chakra-ui/react';
import CityLineBox from './CityLineBox'; // Assuming CityLineBox component is in a separate file

const PageWithBackground = () => {
  // Define the background style
  const backgroundStyle = {
    backgroundImage: 'url("https://img.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg?w=740&t=st=1707575844~exp=1707576444~hmac=e524649f9ae4e0e73d324980eccfc7fdcc86267a4c7c7c1f47b55bd7ae60b666")', // Replace with your background image URL
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', // Ensure the background covers the entire viewport
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px', // Adjust padding as needed
  };

  return (
    <div style={backgroundStyle}>
      <Box bg="rgba(255, 255, 255, 0.7)" p={8} borderRadius="md" boxShadow="lg" textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" color="blue.800" mb={4}>Welcome to City Weather</Text>
        <CityLineBox />
        <Tooltip label="Refresh Weather" placement="top">
          <Button mt={4} colorScheme="teal" variant="outline" size="lg" leftIcon={<i className="fas fa-sync-alt"></i>}>Refresh</Button>
        </Tooltip>
      </Box>
    </div>
  );
};

export default PageWithBackground;
