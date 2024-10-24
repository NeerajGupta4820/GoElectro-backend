import Order from "../Modals/orderModal.js";
import User from "../Modals/userModal.js";

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({}).populate("user", "name email");
    res.status(200).json({ success: true, orders: allOrders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

const addOrder = async (req, res) => {
    try {
      const {shippingInfo,subtotal,tax,shippingCharges,discount,total,orderItems,user,} = req.body;
  
      const userExists = await User.findById(user);
      if (!userExists) {
        return res.status(400).json({ success: false, message: "User does not exist" });
      }
  
      for (const item of orderItems) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
        }
  
        if (product.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${product.title}. Available stock: ${product.stock}`,
          });
        }
      }
  
      // Reduce stock for each order item
      for (const item of orderItems) {
        const product = await Product.findById(item.product);
        product.stock -= item.quantity;
        await product.save();
      }
  
      const newOrder = await Order.create({shippingInfo,subtotal,tax,shippingCharges,discount,total,orderItems,user,});
  
      res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to add order",
        error: error.message,
      });
    }
  };

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Update the status
    order.status = status || order.status;
    await order.save();

    res.status(200).json({ success: true, message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
};

// Get orders by user
const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userOrders = await Order.find({ user: userId }).populate("user", "name email");

    if (!userOrders.length) {
      return res.status(404).json({ success: false, message: "No orders found for this user" });
    }

    res.status(200).json({ success: true, orders: userOrders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user's orders",
      error: error.message,
    });
  }
};

export {getAllOrders,getOrderById,addOrder,updateOrderStatus,deleteOrder,getOrdersByUser,};
