import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Lending from './sites/main/main';
import Rates from './sites/rates/rate';

function App() {
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
