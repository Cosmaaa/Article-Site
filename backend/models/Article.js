import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
  author:   { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  
  text:     { type: String, required: true },
  date:     { type: Date, default: Date.now }
});


const articleSchema = new mongoose.Schema({
  author:   String,
  title:    String,
  content:  String,
  category: String,
  date:     Date,
  comments: {
    type:    [commentSchema],
    default: []
  }
});

export default mongoose.model("Article", articleSchema);
