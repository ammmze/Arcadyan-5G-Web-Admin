import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
import Login from "./pages/login";
import Signal from "./pages/signal";
import System from "./pages/system";
import WiFi from "./pages/wifi";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Signal />} />
          <Route path="/system" element={<System />} />
          <Route path="/wifi" element={<WiFi />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
