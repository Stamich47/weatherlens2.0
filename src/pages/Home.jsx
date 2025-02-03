import { useState, useEffect } from "react";
import { useFetchCoordsQuery } from "../app/fetchCoordsSlice";
import WeatherFetcher from "../components/WeatherFetcher";

export default function Home() {
  const [city, setCity] = useState("");
  const [queryCity, setQueryCity] = useState("");
  const { data, error, isLoading } = useFetchCoordsQuery(queryCity, {
    skip: !queryCity,
  });
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setCoords({
        lat: data[0].lat,
        lon: data[0].lon,
        name: data[0].display_name,
      });
      console.log(data[0]);
    } else {
      setCoords(null);
    }
  }, [data]);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setQueryCity(city);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl mb-6">Enter city to get coordinates</h2>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Enter city"
        className="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-md"
      />
      <button
        onClick={handleClick}
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>

      {isLoading && <p className="text-blue-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      {coords ? (
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="text-gray-700 text-xl">
            The coordinates for{" "}
            <span className="font-bold text-blue-600">{coords.name}</span> are:
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="bg-blue-200 px-4 py-2 border rounded-md">
              {coords.lat}
            </div>
            <div className="bg-blue-200 px-4 py-2 border rounded-md">
              {coords.lon}
            </div>
          </div>
          <WeatherFetcher coords={coords} />
        </div>
      ) : (
        queryCity &&
        !isLoading &&
        !error && <p className="text-gray-500 mt-4">No coordinates available</p>
      )}
    </div>
  );
}
