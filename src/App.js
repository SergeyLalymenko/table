
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to={'/home'} />} />
    </Routes>
  );
}

export default App;
