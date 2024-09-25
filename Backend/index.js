import express, { urlencoded } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import FileRouter from './Routes/fileRouters.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const DB = process.env.DB;

const app = express();
app.use(cors({origin:"*"}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api', FileRouter);

mongoose
.connect(MONGO_URI, {dbName:DB})
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on the port ${PORT}`);
    })
})
.catch((err)=>{
        console.error('Failed to connect to mongodb', err);
});