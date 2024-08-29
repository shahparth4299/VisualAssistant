import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import InstructionsScreen from './components/InstructionsScreen';
import Header from './components/Header';
import FaceRecognitionScreen from './screens/FaceRecognitionScreen';
import IdentifyObjectsScreen from './screens/IdentifyObjectsScreen';
import ReadingModeScreen from './screens/ReadingModeScreen';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path="/reading" element={<ReadingModeScreen />} />
        <Route path="/face-recognition" element={<FaceRecognitionScreen />} />
        <Route path="/identify-objects" element={<IdentifyObjectsScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/instructions" element={<InstructionsScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
