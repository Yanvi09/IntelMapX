import { useState } from "react";
import axios from "axios";
import MapView from "./MapView";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState("");

  // Default Input (includes broken + predicted cases)
  const [inputData, setInputData] = useState(JSON.stringify([
    { lat: null, lon: null },          //  broken
    { lat: 28.61, lon: 77.20 },        //  real
    { lat: 28.62, lon: 77.21 },        //  real
    { lat: null, lon: 77.22 },         //  predicted

    { lat: 19.07, lon: 72.87 },        // Mumbai
    { lat: null, lon: 72.88 },         // predicted

    { lat: null, lon: null }           //  broken again
  ], null, 2));

  const fetchData = async () => {
    setLoading(true);
    setMessage("");

    let sample;

    // Parse input safely
    try {
      sample = JSON.parse(inputData);
    } catch (e) {
      alert("Invalid JSON ❌");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://intelmapx.onrender.com/api/process-data/",
        sample,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      const result = res.data;

      // Detect anomaly
      const hasBroken = sample.some(
        (p) => p.lat === null || p.lon === null
      );

      if (hasBroken) {
        setMessage("⚠️ Data anomaly detected → triggering prediction engine");
      }

      // Stats
      const real = result.filter((p) => p.type === "real").length;
      const predicted = result.filter((p) => p.type === "predicted").length;
      const broken = result.filter((p) => p.type === "broken").length;

      setStats({
        total: result.length,
        real,
        predicted,
        broken
      });

      setData(result);

    } catch (err) {
      console.error("API ERROR:", err);
      alert("API error — check backend");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        background: "#F1F5F9",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Inter",
        textAlign: "center"
      }}
    >
      {/* HEADER */}
      <h1 style={{ marginBottom: "10px" }}>
        IntelMapX Intelligence Dashboard
      </h1>

      <p style={{ color: "#64748B", marginBottom: "20px" }}>
        Analyze movement patterns, detect failures, and predict missing intelligence
      </p>

      {/* INPUT SECTION */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
          width: "70%",
          marginInline: "auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>Input Data (JSON)</h3>

        <textarea
          rows="7"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            fontFamily: "monospace",
            border: "1px solid #CBD5F5",
            outline: "none",
            fontSize: "13px"
          }}
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={fetchData}
        style={{
          background: "#1D4ED8",
          color: "white",
          padding: "12px 26px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
          fontWeight: "500",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => (e.target.style.background = "#1E40AF")}
        onMouseLeave={(e) => (e.target.style.background = "#1D4ED8")}
      >
        {loading ? "Processing Intelligence..." : "Analyze Movement"}
      </button>

      {/* LOADING */}
      {loading && (
        <div style={{ marginBottom: "15px" }}>
          ⏳ Analyzing data...
        </div>
      )}

      {/* ANOMALY MESSAGE */}
      {message && (
        <div
          style={{
            background: "#FEF3C7",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "15px",
            width: "70%",
            marginInline: "auto"
          }}
        >
          {message}
        </div>
      )}

      {/* STATS */}
      {stats && (
        <div
          style={{
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
          }}
        >
          <div>Total: {stats.total}</div>
          <div style={{ color: "#16A34A" }}>Real: {stats.real}</div>
          <div style={{ color: "#CA8A04" }}>Predicted: {stats.predicted}</div>
          <div style={{ color: "#DC2626" }}>Broken: {stats.broken}</div>
        </div>
      )}

      {/* MAP */}
      <div
        style={{
          width: "90%",
          height: "65vh",
          margin: "auto",
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
        }}
      >
        <MapView data={data} />
      </div>
    </div>
  );
}