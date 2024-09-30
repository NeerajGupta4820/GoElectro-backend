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
    category:{
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
            type: String,  
            required: true,
          },
          link: {
            type: String,  
            required: true,
          },
        },
      ],
});

const Product = mongoose.model("Product",productSchema);

export default Product;