import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
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
    budget: Number,
  },
});

export default mongoose.model("User", UserSchema);
