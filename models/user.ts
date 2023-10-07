import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    minlength: 6,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  isGoogleSession: {
    type: Boolean,
    default: false,
  },
  is_verify: {
    type: Boolean,
    default: false,
  },
  profile_picture: {
    type: String,
    trim: true,
  },
  following: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created_at: {
    type: Date,
    default: Date.now,
  },
  tweets: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
  forgot_password_token: String,
  forgot_password_token_expired: Date,
  verify_token: String,
  verify_token_expired: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
