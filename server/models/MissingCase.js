const mongoose = require("mongoose");

const missingCaseSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    personName: {
      type: String,
      required: true,
      trim: true
    },

    age: {
      type: Number,
      required: true
    },

    gender: {
      type: String,
      required: true
    },

    lastSeenLocation: {
      type: String,
      required: true,
      trim: true
    },

    lastSeenDate: {
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

    status: {
      type: String,
      enum: ["missing", "possible-match", "verified", "closed"],
      default: "missing"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("MissingCase", missingCaseSchema);