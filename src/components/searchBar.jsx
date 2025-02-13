import { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ handleChange, setQueryCity }) {
  const inputRef = useRef(null);
  const autoRef = useRef(null);

  useEffect(() => {
    const loadScript = (url, callback) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.async = true;
      script.defer = true;
      script.onload = callback;
      document.head.appendChild(script);
    };

    const initAutocomplete = () => {
      if (
        inputRef.current &&
        !autoRef.current &&
        window.google &&
        window.google.maps &&
        window.google.maps.places
      ) {
        autoRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["(regions)"],
          }
        );

        const onPlaceChanged = () => {
          const place = autoRef.current.getPlace();
          if (!place.geometry) {
            inputRef.current.placeholder = "Enter a city";
          } else {
            inputRef.current.value = place.formatted_address;
            handleChange({ target: { value: place.formatted_address } });
          }
        };

        autoRef.current.addListener("place_changed", onPlaceChanged);
      }
    };

    if (!window.google) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_PLACES_API
        }&libraries=places&callback=initMap&loading=async`,
        initAutocomplete
      );
    } else {
      initAutocomplete();
    }

    // Add input event listener to update state as you type
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("input", handleChange);
    }

    // Cleanup event listener on unmount
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("input", handleChange);
      }
    };
  }, [handleChange]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setQueryCity(inputRef.current.value);
      }}
      className="flex flex items-center justify-center gap-2"
    >
      <input
        ref={inputRef}
        onChange={handleChange}
        type="text"
        placeholder="Enter city or zip code"
        className="border border-gray-300 rounded-full px-2 py-1 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
        id="autocomplete"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-2 py-2 rounded-full hover:bg-blue-600 transition duration-300"
      >
        <FaSearch />
      </button>
    </form>
  );
}
