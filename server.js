require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3500
console.log(process.env.NODE_ENV)
const routers = require('./routes/router')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.log(err)
    }
}
connectDB()
app.use(express.json());
app.use(cors());
app.use(routers);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))



