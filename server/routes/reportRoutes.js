const express = require("express");

const {
  createFoundReport,
  getFoundReports,
  updateVerificationStatus
} = require("../controllers/reportController");

const {
  protect,
  allowRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/found",
  protect,
  allowRoles("police", "hospital", "ngo", "volunteer"),
  createFoundReport
);

router.get(
  "/found",
  protect,
  getFoundReports
);

router.put(
  "/found/:id/verification",
  protect,
  allowRoles("police"),
  updateVerificationStatus
);

module.exports = router;