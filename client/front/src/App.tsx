import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Room from './Pages/Room';
import Home from './Pages/Home';

function App() {



  return (
    <div className="App">
      <h1>APP</h1>
      <Routes>
        <Route path='/Room/:id' element={<Room/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
