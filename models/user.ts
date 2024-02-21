import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    userId: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    bio: {
      type: String,
      lowercase: true,
      maxLength: 160,
    },
    location: {
      type: String,
      maxLength: 30,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    coverImg: {
      type: String,
      trim: true,
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tweets: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
