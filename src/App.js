import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/layout';


const App = () => {
  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </div>
  );
};

export default App;
