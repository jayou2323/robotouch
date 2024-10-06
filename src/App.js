import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Chatbot_main from './Dev/Chatbot/chatbot_main';
// import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Chatbot_main/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

