const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/authSystem')
  .then(() => console.log(' MongoDB connected'))
  .catch((err) => console.error(' MongoDB connection error:', err));

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session config
app.use(session({
  secret: 'supersecretkey', // in production, store this in env
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/authSystem' }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Routes
app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);


// Redirect home page to login
app.get('/', (req, res) => {
    res.redirect('/login');
  });
  


app.listen(3000, () => console.log(' Server running at http://localhost:3000'));
