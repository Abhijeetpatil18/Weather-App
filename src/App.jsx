import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
// import Login from "./components/Login";
import Footer from "./components/Footer";

function App() {
  const [login, setLogin] = useState(false);
  const [name, setname] = useState("Login");
  const handleClick = () => {
    // setLogin(!login);
  };
  return (
    <>
      <center>
        {/* <Navbar /> */}
        <Card />
      </center>
    </>
  );
}

export default App;
