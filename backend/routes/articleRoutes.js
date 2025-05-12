import express from "express";
import Article from "../models/Article.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id/comments", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(Array.isArray(article.comments) ? article.comments : []);
  } catch (err) {
    console.error("Error in GET /api/articles/:id/comments", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/:id/comments", async (req, res) => {
  try {
    const { author, authorId, text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }
    
    const newComment = {
      author: author || "Anonymous",
      ...(authorId && { authorId }),
      text: text.trim(),
      date: new Date(),
    };
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: newComment } },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Article not found" });
    res.json(updated.comments);
  } catch (err) {
    console.error("Error in POST /api/articles/:id/comments", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.delete("/:id/comments/:commentId", async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    const idx = article.comments.findIndex(c => c._id.toString() === commentId);
    if (idx === -1) return res.status(404).json({ message: "Comment not found" });

    article.comments.splice(idx, 1);
    await article.save();

    
    res.json(article.comments);
  } catch (err) {
    console.error("Error in DELETE /api/articles/:id/comments/:commentId", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
