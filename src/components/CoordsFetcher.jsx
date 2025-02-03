import { useEffect } from "react";
import { useFetchCoordsQuery } from "../app/fetchCoordsSlice";

export default function CoordsFetcher({ city, onCoordsFetched }) {
  const { data, error, isLoading } = useFetchCoordsQuery(city, {
    skip: !city,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      onCoordsFetched({
        lat: data[0].lat,
        lon: data[0].lon,
        name: data[0].display_name,
      });
    } else {
      onCoordsFetched(null);
    }
  }, [data, onCoordsFetched]);

  return (
    <div>
      {isLoading && <p className="text-blue-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
    </div>
  );
}
