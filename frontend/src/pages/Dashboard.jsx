import EventChart from "../components/EventChart";
import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    fetchSessions();
    fetchClickCount();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/events/sessions"
      );

      setSessions(response.data.data);

      const total = response.data.data.reduce(
        (sum, session) => sum + session.totalEvents,
        0
      );

      setTotalEvents(total);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchClickCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/events/heatmap?pageUrl=/"
      );

      setTotalClicks(response.data.data.length);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSessionEvents = async (sessionId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/events/session/${sessionId}`
      );

      setEvents(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Analytics Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            background: "#111827",
            borderRadius: "12px",
            padding: "25px",
            minWidth: "220px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            border: "1px solid #374151",
          }}
        >
          <h3>Total Sessions</h3>
          <h2>{sessions.length}</h2>
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: "12px",
            padding: "25px",
            minWidth: "220px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            border: "1px solid #374151",
          }}
        >
          <h3>Total Events</h3>
          <h2>{totalEvents}</h2>
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: "12px",
            padding: "25px",
            minWidth: "220px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            border: "1px solid #374151",
          }}
        >
          <h3>Total Clicks</h3>
          <h2>{totalClicks}</h2>
        </div>
      </div>
      <EventChart sessions={sessions} />
      <h2>Sessions</h2>

      {sessions.map((session) => (
        <div
          key={session._id}
          onClick={() => fetchSessionEvents(session._id)}
          style={{
            background: "#111827",
            border: "1px solid #374151",
            borderRadius: "12px",
            transition: "0.3s",
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          <h3>Session ID: {session._id}</h3>
          <p>Total Events: {session.totalEvents}</p>
        </div>
      ))}

      <hr />

      <h2>User Journey Timeline</h2>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {events.map((event) => (
          <div
            key={event._id}
            style={{
              borderLeft: "4px solid #4f46e5",
              paddingLeft: "15px",
              paddingTop: "10px",
              paddingBottom: "10px",
              background: "#111827",
              borderRadius: "8px",
            }}
          >
            <h4>{event.eventType.toUpperCase()}</h4>

            <p>Page: {event.pageUrl}</p>

            <p>
              {new Date(event.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;