import { useEffect } from "react";
import { trackPageView, trackClick } from "../services/tracker";

function DemoPage() {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div
      style={{ padding: "40px" }}
      onClick={trackClick}
    >
      <h1>User Analytics Demo Page</h1>

      <button>Sign Up</button>

      <br />
      <br />

      <button>Buy Now</button>

      <br />
      <br />

      <button>Learn More</button>

      <br />
      <br />

      <div
        style={{
          width: "200px",
          height: "100px",
          border: "1px solid black",
          padding: "10px",
        }}
      >
        Sample Product Card
      </div>
    </div>
  );
}

export default DemoPage;