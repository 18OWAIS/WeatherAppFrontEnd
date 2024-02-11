// import logo from './logo.svg';
// import './App.css';
import React from 'react'
import './App.css'


//importing files all our files here
import Nav from './components/Nav';
import Weather from './components/Page';
import PageWithBackground from './components/PageWithBackground';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChartDisplayPage from './pages/ChartDisplayPage';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/cities" element={<PageWithBackground />} />
        <Route path="/chart-display/:city" element={<ChartDisplayPage />} />
      </Routes>
    </Router>
  );
}

export default App;
