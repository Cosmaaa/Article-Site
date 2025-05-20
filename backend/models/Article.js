import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  author: String,
  title: String,
  content: String,
  category: String,
  date: Date,

  
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
   imageUrl: {
    type: String,
    default: null
  }
});

export default mongoose.model("Article", articleSchema);
