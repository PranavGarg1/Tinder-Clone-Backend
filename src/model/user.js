const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email id not Valid: " + value);
        }
      },
    },
    password: { type: String, required: true, minLength: 6 },
    age: { type: Number, min: 18 },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjy-nMokF0yazcxuSpThQVg2UYckMjNNFaOw&s",
    },
    about: {
      type: String,
      default: "I am a SDE",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
