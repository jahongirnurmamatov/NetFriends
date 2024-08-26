import express from 'express';
import userRoutes from './routes/users.js'
import postsRoutes from './routes/posts.js'
import likesRoutes from './routes/likes.js'
import authRoutes from './routes/auth.js'
import commentsRoutes from './routes/comments.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use('/api/users',userRoutes);
app.use('/api/posts',postsRoutes);
app.use('/api/likes',likesRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/comments',commentsRoutes);

app.listen(8000, ()=>{
    console.log('Api working')
})