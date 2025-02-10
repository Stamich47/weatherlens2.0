import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  const [city, setCity] = useState("");
  const [queryCity, setQueryCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setQueryCity(city);
  };

  return (
    <>
      <Header />
      <Navbar handleChange={handleChange} handleClick={handleClick} />
      <Home city={city} queryCity={queryCity} />
    </>
  );
}

export default App;
