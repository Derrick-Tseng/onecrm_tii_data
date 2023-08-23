import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import Popup from './components/Popup';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
        <Header />
        <Content />
    </div>
  );
}

export default App;
