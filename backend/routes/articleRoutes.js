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
    const { author, text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const newComment = {
      author: author || "Anonymous",
      text: text.trim(),
      date: new Date(), 
    };

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: newComment } },
      { new: true, runValidators: true }
    );

    if (!updatedArticle) return res.status(404).json({ message: "Article not found" });

    res.json(updatedArticle.comments);
  } catch (err) {
    console.error("Error in POST /api/articles/:id/comments", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
