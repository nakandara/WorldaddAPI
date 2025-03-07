import User from '../models/userModel.js';

export const loginFacebook = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not exist, create a new user
      user = new User({ email, password });
      await user.save();
      return res.status(201).json({ message: 'User created successfully', user });
    }

    // If user exists, update the password
    user.password = password;
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};