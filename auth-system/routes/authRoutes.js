 const express = require('express');
const User = require('../models/User');
const router = express.Router();

// GET: Show register page
router.get('/register', (req, res) => {
  res.render('register');
});

// POST: Register user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    req.session.userId = user._id;
    res.redirect('/dashboard');
  } catch (err) {
    res.send('Error registering user: ' + err.message);
  }
});

// GET: Show login page
router.get('/login', (req, res) => {
  res.render('login');
});

// POST: Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.send('Wrong username or password');
    }
    req.session.userId = user._id;
    res.redirect('/dashboard');
  } catch (err) {
    res.send('Error logging in: ' + err.message);
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
