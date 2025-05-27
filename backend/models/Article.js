import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  author:   { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  category: { type: String, required: true },
  date:     { type: Date,   default: Date.now },

  likes:    { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
  dislikes: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
  hearts:   { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },

  comments: [
    {
      author:   { type: String, required: true },
      authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      text:     { type: String, required: true },
      date:     { type: Date, default: Date.now },
    },
  ],

  imageUrl: { type: String, default: null },
});

export default mongoose.model("Article", articleSchema);
