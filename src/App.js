import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import Lending from './sites/main/main';
import Rates from './sites/rates/rate';

function App() {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      tg.expand();
      tg.ready();

      tg.setBackgroundColor('#000000');

      document.body.style.height = '100vh';
      document.body.style.width = '100vw';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflow = 'auto';

      const meta = document.querySelector('meta[name="viewport"]');
      if (meta) {
        meta.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lending />} />
          <Route path="/rates" element={<Rates />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
