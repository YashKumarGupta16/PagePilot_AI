require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const passport = require('passport');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

app.set('trust proxy', 1);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration for dev
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret123',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// Passport initialization
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/generateSite'));
app.get('db-ping', async (req, res) => {
  try {
    await mongoose.connection.db.command({ ping: 1 });
    return res.status(200).send("DB oinged successfully");
  }
  catch (err) {
    console.error(err);
    return res.status(500).send("DB ping failed");
  }
})
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
