import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:true,
    },
    Categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"  
        }
    ],
    product:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

const Category = mongoose.model('Category', categorySchema);

export default Category;