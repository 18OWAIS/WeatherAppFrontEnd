import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VStack, HStack, Tooltip, Button } from '@chakra-ui/react';

const CityTooltip = ({ data, placement }) => {
  const navigate = useNavigate();


  const handleClick = () => {
    // Redirect to statewise summary page with the city name as a parameter
    navigate(`/chart-display/${data.city.toLowerCase()}`,{state:data.city});
  };

  const tooltipContent = JSON.stringify(data); // Convert object to string representation

  // Define the background color based on temperature
 const backgroundColor = data.temperature > 30 ? '#ff7b5f' : '#70dbf1';

  return (
    <Tooltip label={tooltipContent} placement={placement}>
      <Button
        flex={1}
        width="auto"
        py={4}
        fontSize="lg"
        onClick={handleClick}
        style={{ backgroundColor }} // Apply dynamic background color
      >
        {data.city}
      </Button>
    </Tooltip>
  );
};

const CityLineBox = () => {
  const cities = [
    [
      { city: 'Delhi', population: 100000, temperature: 25 },
      { city: 'Kolkata', population: 150000, temperature: 30 },
      { city: 'Mumbai', population: 120000, temperature: 22 },
    ],
    [
      { city: 'Chennai', population: 110000, temperature: 37 },
      { city: 'Hyderabad', population: 130000, temperature: 36 },
      { city: 'Goa', population: 140000, temperature: 33 },
    ],
    [
      { city: 'Lucknow', population: 125000, temperature: 26 },
      { city: 'Gurgaon', population: 115000, temperature: 29 },
      { city: 'Noida', population: 105000, temperature: 23 },
    ],
    [
      { city: 'Jaipur', population: 135000, temperature: 31 },
      { city: 'Bhopal', population: 145000, temperature: 20 },
      { city: 'Nagpur', population: 130000, temperature: 28 },
    ]
  ];

  return (
    <VStack spacing={0} py={8}>
      {cities.map((cityGroup, groupIndex) => (
        <HStack key={groupIndex} spacing={0}>
          {cityGroup.map((city, index) => (
            <CityTooltip key={index} data={city} placement='auto-start' />
          ))}
        </HStack>
      ))}
    </VStack>
  );
};

export default CityLineBox;
