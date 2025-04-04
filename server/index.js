import express from 'express'
import dotenv from 'dotenv'
import mongodb from './db.js'
import cors from 'cors';

import studentrouter from './routers/studentrouter.js'
import cookieParser from 'cookie-parser'
import { POST_ID } from './controllers/teacher_idcontroller.js'
import teacherrouter from './routers/teacherrouter.js'
import classrouter from './routers/classrouter.js'
import attendencerouter from './routers/attendencerouter.js'

const app=express()
dotenv.config()

app.use(cors(
    {
        origin: "http://localhost:3000", // Allow frontend
        credentials: true, // Allow cookies
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
      }
));

app.use(express.json())
app.use(cookieParser())

app.use('/api/authstudent',studentrouter);
app.post('/api/teacher_id',POST_ID);
app.use('/api/authteacher',teacherrouter);
app.use('/api/class',classrouter);
app.use('/api/attendence',attendencerouter);

mongodb();
const port=process.env.PORT || 3002;

app.listen(port,()=>{
    console.log(`Server is running in the Port ${port}`);
})