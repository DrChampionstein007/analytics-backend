const Event = require("../models/Event");

const trackEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to save event",
    });
  }
};

const getSessions = async (req, res) => {
  try {
    console.log("GET SESSIONS HIT");

    const sessions = await Event.aggregate([
      {
        $group: {
          _id: "$sessionId",
          totalEvents: { $sum: 1 },
        },
      },
    ]);

    console.log("SESSIONS =", sessions);

    res.status(200).json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    console.log("FULL ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSessionEvents = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const events = await Event.find({
      sessionId: sessionId,
    }).sort({ timestamp: 1 });

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch session events",
    });
  }
};

const getHeatmapData = async (req, res) => {
  try {
    const { pageUrl } = req.query;

    const clicks = await Event.find({
      pageUrl,
      eventType: "click",
    });

    res.status(200).json({
      success: true,
      data: clicks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch heatmap data",
    });
  }
};

const getDashboardData = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();

    const totalClicks = await Event.countDocuments({
      eventType: "click",
    });

    const sessions = await Event.aggregate([
      {
        $group: {
          _id: "$sessionId",
          totalEvents: { $sum: 1 },
          lastEvent: { $max: "$timestamp" },
        },
      },
      {
        $sort: {
          lastEvent: -1,
        },
      },
    ]);

    const recentActivity = await Event.find()
      .sort({ timestamp: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        totalSessions: sessions.length,
        totalEvents,
        totalClicks,
        avgEventsPerSession:
          sessions.length > 0
            ? (totalEvents / sessions.length).toFixed(2)
            : 0,
        sessions,
        recentActivity,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};

module.exports = {
  trackEvent,
  getSessions,
  getSessionEvents,
  getHeatmapData,
  getDashboardData,
};