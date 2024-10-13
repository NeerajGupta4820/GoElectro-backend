import Cart from "../Modals/cartModal.js";
import Product from "../Modals/productModal.js";

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        cartItems: [],
        totalAmount: 0,
        totalQuantity: 0,
      });
    }

    const existingItemIndex = cart.cartItems.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (existingItemIndex > -1) {
      cart.cartItems[existingItemIndex].quantity += quantity;
    } else {
      const newItem = {
        productId,
        name: product.title,
        price: product.price,
        quantity,
      };
      cart.cartItems.push(newItem);
    }

    cart.totalQuantity += quantity;
    cart.totalAmount += product.price * quantity;

    await cart.save();
    return res
      .status(200)
      .json({ success: true, message: "Item added to cart", cart });

  } catch (error) {

    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

const getCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id });
  
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
  
      return res.status(200).json({ success: true, cart });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};
  
const clearCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
  
      cart.cartItems = [];
      cart.totalQuantity = 0;
      cart.totalAmount = 0;
  
      await cart.save();
  
      return res.status(200).json({ success: true, message: 'Cart cleared', cart });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};

const updateCart = async (req, res) => {
  const { updatedCartItems } = req.body; 
  
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
        cart = new Cart({
            userId: req.user.id,
            cartItems: [],
            totalAmount: 0,
            totalQuantity: 0,
          });
    }

    const updatedProductIds = updatedCartItems.map(item => item.productId);

    cart.cartItems = cart.cartItems.filter(item =>
      updatedProductIds.includes(item.productId.toString())
    );

    let totalAmount = 0;
    let totalQuantity = 0;

    for (let updatedItem of updatedCartItems) {
      const product = await Product.findById(updatedItem.productId);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${updatedItem.productId}` });
      }

      const existingItem = cart.cartItems.find(item => item.productId.toString() === updatedItem.productId);

      if (existingItem) {
        existingItem.quantity = updatedItem.quantity;
      } else {
        const newItem = {
          productId: updatedItem.productId,
          name: product.title,
          price: product.price,
          quantity: updatedItem.quantity,
        };
        cart.cartItems.push(newItem);
      }

      totalQuantity += updatedItem.quantity;
      totalAmount += product.price * updatedItem.quantity;
    }

    cart.totalQuantity = totalQuantity;
    cart.totalAmount = totalAmount;

    await cart.save();

    return res.status(200).json({ success: true, message: 'Cart updated successfully', cart });

  } catch (error) {

    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

export {updateCart,getCart,clearCart,addToCart};