import Category from "../Modals/catagoryModal.js";

const fetchAllCategory = async (req, res) => {
    try {
        const data = await Category.find({});
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching categories", error });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, photo, Categories, product } = req.body;
        
        const data = await Category.findById(id);
        if (!data) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        data.name = name || data.name;
        data.photo = photo || data.photo;
        data.Categories = Categories || data.Categories;
        data.product = product || data.product;

        await data.save();
        res.status(200).json({ success: true, message: "Category updated", data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Category.findById(id);
        if (!data) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        await data.remove();
        res.status(200).json({ success: true, message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name, photo, Categories, product } = req.body;
        const data = await Category.create({ name, photo, Categories, product });
        res.status(201).json({ success: true, message: "Category created", data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating category", error });
    }
};

export { fetchAllCategory, updateCategory, deleteCategory, createCategory };
