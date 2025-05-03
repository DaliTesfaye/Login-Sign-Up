const User = require('../models/User');

// POST /api/auth/signup
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for missing fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Create user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/auth/login
exports.loginUser = async (req , res) => {
  try {
    const {email , password} = req.body ;
    if (!email || !password){
      return res.status(400).json("Email and password are required");
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json("Invalid email or password");
    }

    if (user.password !==password){
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(201).json({message : 'Login Successfully' , user})


  }

  catch(err) {
    console.error('login error' , err);
    res.status(500).json({message : 'Server Error'});
  }
}
