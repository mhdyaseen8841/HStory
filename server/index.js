const express=require('express');
const app=express();
const cors=require('cors');

app.use(cors());
app.use(express.json());

const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
dotenv.config();

connectDB();


app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api/user', userRoutes);
app.use('/api/chat',chatRoutes);

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
});

