import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthProvider from "./Context/AuthProvider";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
