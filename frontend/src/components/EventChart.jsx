import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function EventChart({ sessions }) {
  const data = sessions.map((session, index) => ({
    name: `S${index + 1}`,
    events: session.totalEvents,
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        marginTop: "30px",
        border: "1px solid gray",
        padding: "20px",
      }}
    >
      <h3>Events Per Session</h3>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="events"
            stroke="#4f46e5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EventChart;