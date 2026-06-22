const express = require("express");

const {
  trackEvent,
  getSessions,
  getSessionEvents,
  getHeatmapData,
  getDashboardData,
} = require("../controllers/eventController");

const router = express.Router();

router.post("/track", trackEvent);
router.get("/sessions", getSessions);
router.get("/session/:sessionId", getSessionEvents);
router.get("/heatmap", getHeatmapData);

router.get("/dashboard", getDashboardData);

module.exports = router;