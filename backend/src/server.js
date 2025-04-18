import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../routes/authRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

const corsOptions = {
  origin: "http://localhost:3000", 
  credentials: true,               
};

app.use(cors(corsOptions));
app.use(express.json());


app.use("/api/auth", authRoutes);


mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectat la MongoDB Atlas!");
    app.listen(PORT, () => {
      console.log(`Serverul a pornit pe portul ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Eroare la conectarea la MongoDB:", err);
  });
