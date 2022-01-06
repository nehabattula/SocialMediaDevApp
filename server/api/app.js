import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routes from './routes/router.js';
import cors from 'cors';
import fileuploader from 'express-fileupload';

const app = express();

mongoose.connect('mongodb://localhost:27017/DeveloperDatabase');   //use to connect to mongodb database
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(fileuploader());

routes(app);  //routing folder
export default app;