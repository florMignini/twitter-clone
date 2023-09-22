import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, `Please provide a username`],
    unique: true,
    trim: true,
    minlength: 6,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, `Please provide a email`],
    unique: true,
  },
  password: {
    type: String,
    required: [true, `Please provide a password`],
    unique: true,
  },
  is_verify: {
    type: Boolean,
    default: false,
  },
  profile_picture: {
    type: String,
    trim: true,
  },
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
