import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
