import Category from "../Modals/categoryModal.js";
import Product from "../Modals/productModal.js";

const getAllProduct = async (req, res) => {
    try {
        const allProducts = await Product.find({});
        res.status(200).json({ success: true, products: allProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
    }
};

const getbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch product', error: error.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const { title, description, price, category, brand, images } = req.body; 
        console.log(req.body);

        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ success: false, message: 'Category does not exist' });
        }
        const newProduct = await Product.create({
            title,
            description,
            price,
            category,
            brand, 
            images, 
        });

        res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add product', error: error.message });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, category, brand, images } = req.body; 
        const parsedImages = JSON.parse(images);

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, description, price, category, brand, images: parsedImages },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
    }
};
const getLatestProducts = async (req, res) => {
    try {
        const latestProducts = await Product.find({}).sort({ createdAt: -1 }).limit(6); 

        res.status(200).json({ success: true, products: latestProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch latest products', error: error.message });
    }
};
export { getAllProduct, getbyId, addProduct, updateProduct, deleteProduct,getLatestProducts };
