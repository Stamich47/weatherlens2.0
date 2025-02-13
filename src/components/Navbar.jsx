// import { FaHome } from "react-icons/fa";
// import { IoMenu } from "react-icons/io5";
import SearchBar from "./searchBar";
import weatherLensLogo from "../assets/weatherLens_trnsp_lt.png";

export default function Navbar({ handleChange, handleClick, setQueryCity }) {
  return (
    <div className="flex justify-between items-center p-4">
      <img src={weatherLensLogo} alt="WeatherLens Logo" className="h-12" />
      <div className="flex gap-4 items-center">
        <SearchBar
          setQueryCity={setQueryCity}
          handleChange={handleChange}
          handleClick={handleClick}
        />
        {/* <IoMenu size={24} /> */}
      </div>
    </div>
  );
}
