const express = require('express');
const { chats } = require('./data/data');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const app = express();
dotenv.config();
connectDB()
app.get('/',(req,res)=>{
    res.send("API is running")
})

app.use('/api/user',userRoutes)

const PORT = process.env.PORT || 6000;

app.listen(PORT,console.log(`Server running at PORT:${PORT} ...`))