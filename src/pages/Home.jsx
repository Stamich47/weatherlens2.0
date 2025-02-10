import { useState, useEffect } from "react";
import { useFetchCoordsQuery } from "../app/fetchCoordsSlice";
import WeatherFetcher from "../components/WeatherFetcher";
import CoordsFetcher from "../components/CoordsFetcher";

export default function Home({ queryCity, city }) {
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
      console.log(data);
    } else {
      setCoords(null);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center py-6 min-h-screen bg-gray-100 p-4">
      {isLoading && <p className="text-blue-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      {coords ? (
        <div className="flex flex-col items-center justify-center mt-4">
          <CoordsFetcher
            data={data}
            onCoordsFetched={setCoords}
            coords={coords}
          />
          <WeatherFetcher coords={coords} city={city} />
        </div>
      ) : (
        queryCity &&
        !isLoading &&
        !error && <p className="text-gray-500 mt-4">No coordinates available</p>
      )}
    </div>
  );
}
