import React from 'react';
import './App.scss';
import BarkTop from './components/BarkTop';
import Root from './components/Root';
import BarkLeft from './components/BarkLeft';
import TestDataBaseComponent from './TestDataBaseComponent';

function App() {
  
  return (
    <div className="App">
        <BarkTop/>
        <Root>
        <BarkLeft/>
        <TestDataBaseComponent displaytext="First Component Data"/> 
        </Root>
    </div>
  );

}

export default App;
