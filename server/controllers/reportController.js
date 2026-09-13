const FoundReport = require("../models/FoundReport");

const createFoundReport = async (req, res) => {
  try {
    const foundReport = await FoundReport.create({
      ...req.body,
      reportedBy: req.user._id
    });

    res.status(201).json({
      message: "Found-person report created",
      foundReport
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getFoundReports = async (req, res) => {
  try {
    const reports = await FoundReport.find()
      .populate("reportedBy", "name email role")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateVerificationStatus = async (req, res) => {
  try {
    const { verificationStatus } = req.body;

    const report = await FoundReport.findByIdAndUpdate(
      req.params.id,
      {
        verificationStatus
      },
      {
        new: true
      }
    );

    if (!report) {
      return res.status(404).json({
        message: "Found report not found"
      });
    }

    res.json({
      message: "Verification status updated",
      report
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createFoundReport,
  getFoundReports,
  updateVerificationStatus
};