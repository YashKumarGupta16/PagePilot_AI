const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username });
    
    // register is provided by passport-local-mongoose
    await User.register(user, password);
    
    // Automatically log in after signup
    passport.authenticate('local')(req, res, () => {
      res.json({ message: 'Signup successful', user: { username: req.user.username, _id: req.user._id, createdAt: req.user.createdAt } });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful', user: { username: req.user.username, _id: req.user._id, createdAt: req.user.createdAt } });
});

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: 'Logout successful' });
  });
});

router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: { username: req.user.username, _id: req.user._id, createdAt: req.user.createdAt } });
  } else {
    res.json({ user: null });
  }
});

module.exports = router;
