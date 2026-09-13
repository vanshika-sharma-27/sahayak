const mongoose = require("mongoose");

const foundReportSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    personName: {
      type: String,
      default: ""
    },

    age: {
      type: Number,
      default: null
    },

    gender: {
      type: String,
      default: ""
    },

    foundLocation: {
      type: String,
      required: true
    },

    foundDate: {
      type: Date,
      required: true
    },

    clothingDescription: {
      type: String,
      required: true
    },

    physicalDescription: {
      type: String,
      default: ""
    },

    photo: {
      type: String,
      default: ""
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("FoundReport", foundReportSchema);