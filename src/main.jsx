import { Provider } from "react-redux";
import { store } from "./app/source.js";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const apiKey = import.meta.env.VITE_PLACES_API;

const loadGoogleMapsScript = (callback) => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap&loading=async`;
  script.async = true;
  script.defer = true;
  script.onload = callback;
  document.head.appendChild(script);
};

loadGoogleMapsScript(() => {
  createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
