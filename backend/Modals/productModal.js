import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    catagories:{
        type:String,
        enum:["neckband", "powerbank",  "datacable", "earphone" ,"charger", "bluetoothspeaker", "folder", "phonecover", "earpods"],
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image: [
        {
          color: {
            type: String,  // The color can be a string representing a color
            required: true,
          },
          link: {
            type: String,  // The link for the image
            required: true,
          },
        },
      ],
});

const Product = mongoose.model("Product",productSchema);

export default Product;