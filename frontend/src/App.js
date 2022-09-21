import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Restaurants from './pages/Restaurants';
import About from "./pages/About";
import Contact from "./pages/Contact";
//import Footer from "./components/footer";
import Login from "./components/Login";
import Register from "./components/Register";


function App() {

  return (
    <div className="SCREEN flex w-full min-h-screen h-full dark:bg-gray-500 place-content-center">
      <div className="CONTAINER dark:bg-gray-800 bg-gray-200 w-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar/>} >
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="restaurants" element={<Restaurants />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register  />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );

}

export default App;