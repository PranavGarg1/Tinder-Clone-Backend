const mongoose = require("mongoose");
const validator = require("validator");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // referencing to user collection
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // referencing to user collection
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "accepted", "rejected", "interested"],
        message: "{VALUE} is incorrect",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
