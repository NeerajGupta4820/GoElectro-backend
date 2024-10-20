import User from "../Modals/userModal.js";
import Cart from "../Modals/cartModal.js"; 
import { generateToken } from "../Utils/jwt.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, photo } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const user = await User.create({ name, email, password, role, photo });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
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

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);

    const cart = await Cart.findOne({ userId: user._id }).populate({
      path: 'cartItems.productId',
      select: 'title price images rating numReviews'
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        images: user.images,
        role: user.role,
      },
      cart: {
        cartItems: cart ? cart.cartItems : [], 
        totalAmount: cart ? cart.totalAmount : 0, 
        totalQuantity: cart ? cart.totalQuantity : 0,
      }, 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const allUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({
      success: true,
      users: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all users",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password, role, photo } = req.body;
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (photo) user.photo = photo;

    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export { createUser, loginUser, allUsers, updateUser };
