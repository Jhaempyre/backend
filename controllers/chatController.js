const Message = require('../models/Message');

// Send message
exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, content, type } = req.body;

  try {
    const message = new Message({ senderId, receiverId, content, type });
    await message.save();
    res.status(201).json({ message: 'Message sent', data: message });
  } catch (err) {
    res.status(500).json({ error: 'Error sending message' });
  }
};

// Get messages between two users
exports.getMessages = async (req, res) => {
  const { senderId, receiverId } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
};
