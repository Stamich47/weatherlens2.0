import { useEffect, useRef } from "react";

export default function SearchBar({ handleChange, handleClick }) {
  const inputRef = useRef(null);

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
      if (inputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["(regions)"],
          }
        );
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            inputRef.current.placeholder = "Enter a city";
          } else {
            inputRef.current.value = place.formatted_address;
            handleChange({ target: { value: place.formatted_address } });
          }
        });

        const onPlaceChanged = () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            inputRef.current.placeholder = "Enter a city";
          } else {
            inputRef.current.value = place.formatted_address;
            console.log(place);
          }
        };

        autocomplete.addListener("place_changed", onPlaceChanged);
      }
    };

    if (!window.google) {
      loadScript(
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBnBjrbvmTuUSnTs7r45X7APW7dvzwHrhY&libraries=places",
        initAutocomplete
      );
    } else {
      initAutocomplete();
    }
  }, [handleChange]);

  return (
    <form
      onSubmit={handleClick}
      className="flex flex items-center justify-center gap-2"
    >
      <input
        ref={inputRef}
        onChange={handleChange}
        type="text"
        placeholder="Enter city or zip code"
        className="border border-gray-300 rounded-md p-2 w-full max-w-md"
        id="autocomplete"
      />
      <button
        onClick={handleClick}
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
}
