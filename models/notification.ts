import mongoose from "mongoose";


const tweetNotificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: { type: String },
    seen: { type: Boolean, default: false}
  },
  {
    timestamps: true,
  }
);

const Notification =
  mongoose.models.Notification || mongoose.model("Notification", tweetNotificationSchema);

export default Notification;
