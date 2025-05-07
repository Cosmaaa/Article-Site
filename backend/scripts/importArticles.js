import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Article from '../models/Article.js';

dotenv.config();

const filePath = path.join(process.cwd(), 'data', 'articles.json');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log(" Connected to MongoDB");
  const articles = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  await Article.deleteMany();
  await Article.insertMany(articles);
  console.log(` Imported ${articles.length} articles`);
  process.exit();
})
.catch(err => {
  console.error(" MongoDB connection error:", err);
  process.exit(1);
});
