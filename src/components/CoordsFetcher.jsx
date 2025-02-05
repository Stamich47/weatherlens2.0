import { useEffect, useState } from "react";

export default function CoordsFetcher({ data, onCoordsFetched, coords }) {
  const [allCities, setAllCities] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setAllCities(data);
      onCoordsFetched({
        lat: data[0].lat,
        lon: data[0].lon,
        name: data[0].display_name,
      });
    } else {
      onCoordsFetched(null);
    }
  }, [data, onCoordsFetched]);

  useEffect(() => {
    console.log(allCities);
  }, [allCities]);

  return (
    <div>
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
    </div>
  );
}
