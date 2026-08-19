import uploadImage from "../config/uploadImage.js";
import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files?.image1?.[0] || null;
    const image2 = req.files?.image2?.[0] || null;
    const image3 = req.files?.image3?.[0] || null;
    const image4 = req.files?.image4?.[0] || null;

    const imagesToUpload = [image1, image2, image3, image4].filter(Boolean);

    const imagesUrl = await Promise.all(
      imagesToUpload.map((item) => uploadImage(item.path))
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: typeof sizes === "string" ? JSON.parse(sizes) : sizes,
      bestseller: bestseller === "true" || bestseller === true,
      date: Date.now(),
      image1: imagesUrl[0] || "",
      image2: imagesUrl[1] || "",
      image3: imagesUrl[2] || "",
      image4: imagesUrl[3] || "",
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const listProduct = async (req, res) => {
  try {
    const product = await Product.find({})
    return res.status(200).json(product)
  } catch (error) {
    console.log("listProduct error ")
    return res.status(500).json({message: `listProduct error ${error}`})
  }
}



export const removeProduct = async (req, res) => {
  try {
    let {id} = req.params;
    const product = await Product.findByIdAndDelete(id)
    return res.status(200).json(product)
    
  } catch (error) {
    console.log("removeProduct error ")
    return res.status(500).json({message: `removeProduct error ${error}`})
  }

}