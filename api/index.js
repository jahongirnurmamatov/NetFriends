import express from "express";
import userRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import likesRoutes from "./routes/likes.js";
import authRoutes from "./routes/auth.js";
import commentsRoutes from "./routes/comments.js";
import relationsRoutes from "./routes/relationship.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import { upload } from "./multer.js";

const app = express();

//middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/relationships", relationsRoutes);

//uploading image
app.post('/api/upload',upload.single('file'),(req,res)=>{
  const file=req.file;
  res.status(200).json(file.filename);
});

app.listen(8000, () => {
  console.log("Api working");
});
