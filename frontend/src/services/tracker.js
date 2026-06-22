import axios from "axios";

const API_URL = "http://localhost:5000/api/events/track";

const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);
  }

  return sessionId;
};

export const trackPageView = async () => {
  try {
    await axios.post(API_URL, {
      sessionId: getSessionId(),
      eventType: "page_view",
      pageUrl: window.location.pathname,
    });
  } catch (error) {
    console.error("Page View Tracking Error:", error);
  }
};

export const trackClick = async (event) => {
  try {
    await axios.post(API_URL, {
      sessionId: getSessionId(),
      eventType: "click",
      pageUrl: window.location.pathname,
      x: event.clientX,
      y: event.clientY,
    });
  } catch (error) {
    console.error("Click Tracking Error:", error);
  }
};