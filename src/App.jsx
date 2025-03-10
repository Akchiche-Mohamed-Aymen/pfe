import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Consulting from './Consulting';
import Audit from './Audit';
import './App.css'
function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/consulting" element={<Consulting />} />
      </Routes>
  );
}

export default App;