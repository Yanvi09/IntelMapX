import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Icons
const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32]
});

const yellowIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  iconSize: [32, 32]
});

const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32]
});

// Select icon
const getIcon = (type) => {
  if (type === "real") return greenIcon;
  if (type === "predicted") return yellowIcon;
  return redIcon;
};

// 🔥 AUTO ZOOM COMPONENT
function AutoZoom({ data }) {
  const map = useMap();

  if (data.length > 0) {
    const bounds = data.map(p => [p.lat, p.lon]);
    map.fitBounds(bounds, { padding: [50, 50] });
  }

  return null;
}

export default function MapView({ data }) {
  return (
    <MapContainer
      center={[28.61, 77.20]}
      zoom={5}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <AutoZoom data={data} />

      {data.map((point, index) => (
        <Marker
          key={index}
          position={[point.lat, point.lon]}
          icon={getIcon(point.type)}
        >
          <Popup>
            <div style={{ fontSize: "14px" }}>
              <strong>
                {point.type === "real" && "REAL DATA 🟢"}
                {point.type === "predicted" && "PREDICTED ⚠️"}
                {point.type === "broken" && "BROKEN ❌"}
              </strong>
              <br /><br />

              <b>Lat:</b> {point.lat} <br />
              <b>Lon:</b> {point.lon} <br /><br />

              {point.type === "predicted" && (
                <span>
                  Reason: Missing coordinates <br />
                  Method: Velocity-based estimation
                </span>
              )}

              {point.type === "broken" && (
                <span>
                  Reason: Insufficient data <br />
                  Prediction not possible
                </span>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}