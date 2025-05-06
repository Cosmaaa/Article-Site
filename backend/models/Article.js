import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  author: String,
  title: String,
  content: String,
  category: String,
  date: Date
});

export default mongoose.model('Article', articleSchema);
