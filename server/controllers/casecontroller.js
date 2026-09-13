const MissingCase = require("../models/MissingCase");
const FoundReport = require("../models/FoundReport");
const calculateMatchScore = require("../utils/matchingAlgorithm");

const createMissingCase = async (req, res) => {
  try {
    const missingCase = await MissingCase.create({
      ...req.body,
      reportedBy: req.user._id
    });

    res.status(201).json({
      message: "Missing-person report created",
      missingCase
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getMissingCases = async (req, res) => {
  try {
    const cases = await MissingCase.find()
      .populate("reportedBy", "name email role")
      .sort({ createdAt: -1 });

    res.json(cases);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getMyMissingCases = async (req, res) => {
  try {
    const cases = await MissingCase.find({
      reportedBy: req.user._id
    }).sort({ createdAt: -1 });

    res.json(cases);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getMatches = async (req, res) => {
  try {
    const missingCase = await MissingCase.findById(
      req.params.id
    );

    if (!missingCase) {
      return res.status(404).json({
        message: "Missing case not found"
      });
    }

    const foundReports = await FoundReport.find()
      .populate("reportedBy", "name role")
      .sort({ createdAt: -1 });

    const matches = foundReports
      .map((report) => {
        const score = calculateMatchScore(
          missingCase,
          report
        );

        return {
          report,
          score
        };
      })
      .filter((item) => item.score >= 25)
      .sort((a, b) => b.score - a.score);

    res.json({
      missingCase,
      matches
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateCaseStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedCase = await MissingCase.findByIdAndUpdate(
      req.params.id,
      {
        status
      },
      {
        new: true
      }
    );

    if (!updatedCase) {
      return res.status(404).json({
        message: "Case not found"
      });
    }

    res.json({
      message: "Case status updated",
      updatedCase
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createMissingCase,
  getMissingCases,
  getMyMissingCases,
  getMatches,
  updateCaseStatus
};