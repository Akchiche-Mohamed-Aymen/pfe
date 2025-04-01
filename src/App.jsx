import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./DashBoard";
import Navbar from "./NavBar1";
import Consulting from "./Consulting";
import Audit from "./Audit1";
import Marketing from "./Marketing1";
import Accounting from "./Accounting";
import Amortissemet from "./Amortissemet";
import "./App.css";

//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



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Navbar />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="audit" element={<Audit />} />
        <Route path="consulting" element={<Consulting />} />
        <Route path="marketing" element={<Marketing />} />
        <Route path="accounting" element={<Accounting />} />             
        <Route path="amortization" element={<Amortissemet />} />             
      </Route>
    </Routes>
  );
}

export default App;
