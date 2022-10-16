import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import blogRoutes from './src/routes/blogRoutes.js';
import publicRoutes from './src/routes/publicRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import { errorHandler } from './src/middleware/errorMiddleWare.js';
import { connectDB } from './src/database/db.js';
import path from 'path';

dotenv.config();

const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());

app.use('/', express.static('public'));

//serve static assests if production

if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static(path.join(__dirname, 'client')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}

app.use(cors());

app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send(`this is home page`);
});

app.use('/api/blogs', publicRoutes);

app.use('/api/user/blogs', blogRoutes)

app.use('/api/users', userRoutes);

app.use(errorHandler)

app.listen(port, () => {
    console.log(`port is running on port ${port}`);
});