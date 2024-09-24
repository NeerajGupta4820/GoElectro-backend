import mongoose, { mongo } from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ]
});

const subCategory = mongoose.model('SubCatagory',subCategorySchema);

export default subCategory;