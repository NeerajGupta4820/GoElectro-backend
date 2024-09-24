import User from "../Modals/userModal.js";  
import {generateToken} from "../Utils/jwt.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password, type, photo, images } = req.body;

    // if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const user = await User.create({ name, email, password, type, photo, images });

    const token = generateToken(user._id,user.type);

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
        photo: user.photo,
        images: user.images,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    // compare password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id,user.type);

    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
        photo: user.photo,
        images: user.images,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createUser, loginUser };
