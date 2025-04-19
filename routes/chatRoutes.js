const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/chatController.js');
const upload = require('../middlewares/upload.js');

router.post('/send', sendMessage);
router.get('/messages', getMessages);

// NEW: Send image message
router.post('/send-image', upload.single('image'), async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'Image not found in request' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  try {
    const Message = require('../models/Message');
    const message = new Message({
      senderId,
      receiverId,
      content: imageUrl,
      type: 'image'
    });

    await message.save();
    res.status(201).json({ message: 'Image message sent', data: message });
  } catch (err) {
    res.status(500).json({ error: 'Error sending image message' });
  }
});

module.exports = router;
