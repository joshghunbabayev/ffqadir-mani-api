import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import { v2 as cloudinary } from "cloudinary";

import adminRouter from './routers/admin.js';
import gameRouter from './routers/game.js';
import loungeRouter from './routers/lounge.js';
import invoiceRouter from './routers/invoice.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(methodOverride('_method', {
    methods: ['POST', 'GET', 'PUT', 'DELETE']
}));
app.use("/main-ffqad", express.static("static"));
app.set('view engine', 'ejs');

app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

app.use('/main-ffqad/admin', adminRouter);
app.use('/main-ffqad/game', gameRouter);
app.use('/main-ffqad/lounge', loungeRouter);
app.use('/main-ffqad/invoice', invoiceRouter);