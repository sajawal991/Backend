const express = require('express');
const router = express.Router();
const Message = require('../models/message.js');

// Endpoint to create a new message
router.post('/', async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }

  try {
    const newMessage = new Message({ name, message });
    await newMessage.save();
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find(); // Retrieve all messages from the database
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
