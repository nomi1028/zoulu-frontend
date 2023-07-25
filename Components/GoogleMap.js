import { useState, useEffect } from "react";
import { withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";
import { Loader } from "@googlemaps/js-api-loader";

const Map = withGoogleMap(({ center, radius }) => {
  console.log(center, radius);
  const circleOptions = {
    strokeColor: "#007FFF",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#007FFF",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: Number(radius) * 1000,
    center: center,
  };
  return (
    <GoogleMap defaultZoom={11} defaultCenter={center} options={{ streetViewControl: false, mapTypeControl: false }}>
      <Marker
        position={center}
        icon={{
          url: "https://res.cloudinary.com/dutqh6vja/image/upload/v1678093723/Vector_zbalkz.png",
          scaledSize: new window.google.maps.Size(30, 40),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(12, 12),
        }}
      />
      <Circle center={center} options={circleOptions} />
    </GoogleMap>
  );
});

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

function ProfileMap(props) {
  console.log(props);
  const { location, radius } = props;
  const [center, setCenter] = useState({
    lat: location.lat,
    lng: location.long,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCenter({ lng: location.long, lat: location.lat });
    setLoading(false);
  }, []);
  return (
    <div style={{ height: "100%", width: "100%", borderRadius: "10px" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Map containerElement={<div style={{ height: "100%", borderRadius: "10px" }} />} mapElement={<div style={{ height: "100%", borderRadius: "10px" }} />} center={center} radius={radius} />
      )}
    </div>
  );
}

export default ProfileMap;
