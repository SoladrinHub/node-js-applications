const express = require('express');
const router = express.Router();

// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
}

// GET: Dashboard (protected)
router.get('/', isAuthenticated, (req, res) => {
  res.render('dashboard');
});

module.exports = router;
