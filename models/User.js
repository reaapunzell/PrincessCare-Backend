import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: false,
      maxlength: 60,
    },
    lastName: {
      type: String,
      required: true,
      unique: false,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    cycleData: {
      lastPeriodDate: Date,
      symptoms: [String],
      periodDuration: {
        type: Number,
        required: false,
        min: 1,
        max: 20,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
