import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
import Article from '../models/Article.js';

dotenv.config();
const key = process.env.UNSPLASH_ACCESS_KEY;

async function getImage(query) {
  const res = await axios.get('https://api.unsplash.com/photos/random', {
    params: { query, orientation: 'landscape' },
    headers: { Authorization: `Client-ID ${key}` }
  });
  return res.data.urls.regular;
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const cursor = Article.find({ imageUrl: null }).cursor();
  for (let art = await cursor.next(); art; art = await cursor.next()) {
    try {
      const url = await getImage(art.title);
      art.imageUrl = url;
      await art.save();
      console.log(`${art.title} → ${url}`);
    } catch (e) {
      console.error(` ${art.title}`, e.message);
    }
  }
  process.exit();
}

run();
