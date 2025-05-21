import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
import Article from '../models/Article.js';

dotenv.config();
const key = process.env.UNSPLASH_ACCESS_KEY;

const unsplashQueries = {
  sport:     'sports',
  lifestyle: 'lifestyle',
  latest:    'breaking news',
  tech:      'technology',
  toate:     'news'
};

async function getImage(query) {
  console.log(`Căutare imagine pentru: "${query}"`);
  const res = await axios.get('https://api.unsplash.com/photos/random', {
    params: {
      query,
      orientation: 'landscape'
    },
    headers: {
      Authorization: `Client-ID ${key}`
    }
  });
  return res.data.urls.regular;
}

async function run() {
  console.log(' Pornesc scriptul de fetch imagini…');
  await mongoose.connect(process.env.MONGO_URI);

  
  const cursor = Article.find().cursor();

  let total = 0;
  for (let art = await cursor.next(); art; art = await cursor.next()) {
    total++;
    const rawCat   = art.category || '';
    const catKey   = rawCat.toLowerCase().trim();
    const queryTerm = unsplashQueries[catKey] || unsplashQueries['toate'];

    console.log(`\n Articol #${total}: "${art.title}" — categorie raw: "${rawCat}", cheie: "${catKey}"`);

    let url = null;
   
    const attempts = [queryTerm, unsplashQueries['toate']];
    for (let term of attempts) {
      try {
        url = await getImage(term);
        console.log(`Găsit pentru term "${term}": ${url}`);
        break;
      } catch (e) {
        console.warn(`Eșuat pentru term "${term}": ${e.response?.status || e.message}`);
      }
    }

    if (url) {
      art.imageUrl = url;
      await art.save();
      console.log(`Salvat URL pentru "${art.title}"`);
    } else {
      console.error(`Nu am găsit nicio imagine pentru “[${art.category}] ${art.title}”`);
    }
  }

  console.log(`\nScript terminat. Au fost procesate ${total} articole.`);
  process.exit(0);
}

run();
