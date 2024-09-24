import Product from "../Modals/productModal.js";

const getAllProduct = async (req, res) => {
    try {
        const allProducts = await Product.find({});
        res.status(200).json({ success: true, products: allProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
    }
}

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
        const { title, description, price, image, category } = req.body;

        const newProduct = await Product.create({ title, description, image, price, category });

        res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add product', error: error.message });
    }
}

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
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, image, category } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            { title, description, price, image, category }, 
            { new: true, runValidators: true } 
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
    }
}


export { getAllProduct, getbyId, addProduct, updateProduct, deleteProduct };
