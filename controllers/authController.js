const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {

    console.log("request",req)
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid password" });

  res.status(200).json({ message: "Login successful", userId: user._id });
};

exports.health = async(req,res)=>{
    res.status(200).json({ message: "Server is up and running" });
}
