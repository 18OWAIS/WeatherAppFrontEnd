import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Box,
  Input,
  Button,
  Flex,
  Text,
  Heading,
  Stack,
  Card,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { WiThermometer, WiDaySunny } from 'react-icons/wi';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const jsonData = {
        city: city,
        units: unit,
      };

      const response = await axios.post('https://weatherappbackend-is2k.onrender.com/api/location', jsonData);
      const data = response.data;
      data.city = city;
      setWeather(data);
      setError(null);
    } catch (error) {
      setError('Error fetching weather data');
      console.error(error);
    }
  };

  useEffect(() => {
    setSearchHistory(prevSearches => {
      const newSearches = [weather, ...prevSearches.slice(0, 4)];
      return newSearches;
    });
  }, [weather]);

  return (
    <Container maxW="container.lg" mt={10}>
      <Card p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="gray.100">
        <Heading mb={4} textAlign="center" color="blue.500">
          Weather App
        </Heading>
        <Stack spacing={4}>
          <Flex alignItems="center">
            <Input
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button ml={2} onClick={handleSearch} leftIcon={<WiDaySunny size={20} />}>
              Search
            </Button>
          </Flex>
          <Box>
            <Button
              mr={2}
              variant={unit === 'metric' ? 'solid' : 'outline'}
              onClick={() => setUnit('metric')}
            >
              Celsius <WiThermometer size={20} />
            </Button>
            <Button
              variant={unit === 'imperial' ? 'solid' : 'outline'}
              onClick={() => setUnit('imperial')}
            >
              Fahrenheit <WiThermometer size={20} />
            </Button>
          </Box>
          {error && <Text color="red.500">{error}</Text>}
          {weather && (
            <Card p={4}>
              <Text>{`Temperature: ${weather.main.temp} ${
                unit === 'metric' ? '°C' : '°F'
              }`}</Text>
              <Text>{`Weather: ${weather.weather[0].description}`}</Text>
              <Text>{`Wind Speed: ${weather.wind.speed} ${
                unit === 'metric' ? 'm/s' : 'mph'
              }`}</Text>
            </Card>
          )}
          <Box>
            <Heading size="md" mt={4}>Recent Searches:</Heading>
            <List spacing={3} mt={2}>
              {weather && searchHistory.length > 0 ? searchHistory.map((search, index) => (
                search ? (
                  <ListItem
                    key={index}
                    display="flex"
                    style={{ cursor: 'pointer' }}
                    alignItems="center"
                    onClick={() => {
                      navigate(`/chart-display/${search.city.toLowerCase()}`, { state: search.city });
                    }}
                  >
                    <ListIcon as={WiDaySunny} color="blue.500" />
                    <Text>{search.city}</Text>
                  </ListItem>
                ) : null
              )) : (
                <Text>No recent searches</Text>
              )}
            </List>
          </Box>
        </Stack>
      </Card>
    </Container>
  );
};

export default Weather;
