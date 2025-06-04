const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const eventRoute = require('./routes/events')
const attendeeRoute = require('./routes/attendeeroute');

const App = express();
const PORT = process.env.PORT;

App.use(cors());
App.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


App.use('/signup',signupRoute);
App.use('/login',loginRoute);
App.use('/events',eventRoute);
App.use('/attendees',attendeeRoute);


App.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
})
