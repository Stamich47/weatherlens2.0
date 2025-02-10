import { FaHome } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import SearchBar from "./searchBar";

export default function Navbar({ handleChange, handleClick }) {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex gap-4 items-center">
        <FaHome size={24} />
        <SearchBar handleChange={handleChange} handleClick={handleClick} />
      </div>
      <IoMenu size={24} />
    </div>
  );
}
