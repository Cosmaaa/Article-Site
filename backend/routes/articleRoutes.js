import express from "express";
import Article from "../models/Article.js";
import {authenticateToken} from "../middleware/authMiddleware.js"

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



router.delete("/:id/comments/:commentId", authenticateToken, async (req, res) => {
  const { id, commentId } = req.params;
  try {
    
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    
    const comment = article.comments.find(c => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.authorId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not your comment" });
    }

    
    await Article.findByIdAndUpdate(id, {
      $pull: { comments: { _id: commentId } }
    });

    
    const updated = await Article.findById(id);
    return res.json(updated.comments);
  } catch (err) {
    console.error("Error in DELETE /api/articles/:id/comments/:commentId:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});




router.post("/:id/react", authenticateToken, async (req, res) => {
  const { id }   = req.params;
  const { type } = req.body;           
  const userId   = req.user.userId;    

  if (!["like","dislike","heart"].includes(type)) {
    return res.status(400).json({ message: "Invalid reaction type" });
  }

  try {
    const art = await Article.findById(id);
    if (!art) return res.status(404).json({ message: "Article not found" });

    
    if (type === "dislike") {
      art.likes    = [];
      art.hearts   = [];
      art.dislikes = Array.from(new Set([userId, ...art.dislikes]));
    }
    
    else if (type === "like") {
      art.dislikes = art.dislikes.filter(uid => uid.toString() !== userId);
      const already = art.likes.some(uid => uid.toString() === userId);
      if (already) {
        art.likes = art.likes.filter(uid => uid.toString() !== userId);
      } else {
        art.likes.push(userId);
      }
    }
    
    else if (type === "heart") {
      art.dislikes = art.dislikes.filter(uid => uid.toString() !== userId);
      const already = art.hearts.some(uid => uid.toString() === userId);
      if (already) {
        art.hearts = art.hearts.filter(uid => uid.toString() !== userId);
      } else {
        art.hearts.push(userId);
      }
    }

    await art.save();

    return res.json({
      likes:    art.likes.length,
      dislikes: art.dislikes.length,
      hearts:   art.hearts.length,
      myReactions: {
        liked:    art.likes.some(uid => uid.toString() === userId),
        disliked: art.dislikes.some(uid => uid.toString() === userId),
        hearted:  art.hearts.some(uid => uid.toString() === userId),
      }
    });
  } catch (err) {
    console.error("Error in POST /api/articles/:id/react:", err);
    return res.status(500).json({ message: "Server error" });
  }
});





export default router;
