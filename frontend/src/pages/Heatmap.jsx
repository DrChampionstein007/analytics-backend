import { useEffect, useState } from "react";
import axios from "axios";

function Heatmap() {
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    fetchHeatmapData();
  }, []);

  const fetchHeatmapData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/events/heatmap?pageUrl=/"
      );

      setClicks(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Heatmap View</h1>

      <div
        style={{
          position: "relative",
          width: "1000px",
          height: "600px",
          border: "2px solid gray",
          marginTop: "20px",
        }}
      >
        {clicks.map((click) => (
          <div
            key={click._id}
            style={{
              position: "absolute",
              left: `${click.x}px`,
              top: `${click.y}px`,
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "red",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Heatmap;