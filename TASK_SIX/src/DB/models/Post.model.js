import mongoose, { Schema } from "mongoose";
const postSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    caption: {
      type: String,
      required: true,
      trim: true,
    },
    images: [{ type: String, trim: true }],
    likesCounts: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    collation: "gdg",
  },
);

export const PostModel =
  mongoose.models.Post || mongoose.model("Post", postSchema);
