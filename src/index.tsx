import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Calculator from './pages/calculator/Calculator';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <React.StrictMode>
    <div>
      <h1>Calculator</h1>
      <Calculator />
    </div>
  </React.StrictMode>
);