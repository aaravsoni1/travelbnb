import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetData from './components/GetData';
import App from './components/App';
import { TokenProvider } from './components/TokenContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <Routes>
    <Route path="/" element={<TokenProvider><App/></TokenProvider>} />
    <Route path="/login" element={ <App />} />
    <Route path="/property" element={<TokenProvider><GetData /></TokenProvider>} />
  </Routes>
</Router>
    

);
reportWebVitals();
