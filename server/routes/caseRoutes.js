const express = require("express");

const {
  createMissingCase,
  getMissingCases,
  getMyMissingCases,
  getMatches,
  updateCaseStatus,
} = require("../controllers/casecontroller");

const {
  protect,
  allowRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Family: create missing-person case
router.post(
  "/missing",
  protect,
  allowRoles("family"),
  createMissingCase
);

// Police, hospital, NGO, volunteer: view missing cases
router.get(
  "/missing",
  protect,
  getMissingCases
);

// Family: view own missing cases
router.get(
  "/my-missing",
  protect,
  allowRoles("family"),
  getMyMissingCases
);

// Logged-in user: view matches
router.get(
  "/matches/:id",
  protect,
  getMatches
);

// Police: update case status
router.put(
  "/missing/:id/status",
  protect,
  allowRoles("police"),
  updateCaseStatus
);

module.exports = router;