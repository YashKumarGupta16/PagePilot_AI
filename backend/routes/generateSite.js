const express = require('express');
const Site = require('../models/Site');
const { generateWebsiteCode } = require('../services/aiService');

const router = express.Router();

// Middleware to ensure user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

router.post('/generate-site', isAuthenticated, async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const generatedData = await generateWebsiteCode(prompt);

    const site = new Site({
      userId: req.user._id,
      prompt,
      title: generatedData.title || 'Untitled Site',
      description: generatedData.description || '',
      features: generatedData.features || [],
      html: generatedData.html || '',
      css: generatedData.css || '',
      js: generatedData.js || '',
    });

    await site.save();
    res.json(site);
  } catch (err) {
    console.error('Error generating site:', err);
    res.status(502).json({ error: 'AI response could not be parsed or generation failed, please try again' });
  }
});

router.get('/my-sites', isAuthenticated, async (req, res) => {
  try {
    const sites = await Site.find({ userId: req.user._id })
      .select('prompt title createdAt _id')
      .sort({ createdAt: -1 });
    res.json(sites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sites' });
  }
});

router.get('/my-sites/:id', isAuthenticated, async (req, res) => {
  try {
    const site = await Site.findOne({ _id: req.params.id, userId: req.user._id });
    if (!site) {
      return res.status(404).json({ error: 'Site not found' });
    }
    res.json(site);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch site' });
  }
});

module.exports = router;
