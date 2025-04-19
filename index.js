// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(cors({
    origin: '*', // or use your phone IP for security
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

console.log(process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Connected");
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
}).catch(err => console.error(err));
