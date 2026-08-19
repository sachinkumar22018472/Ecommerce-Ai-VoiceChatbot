import supabase from "./supabase.js";
import fs from "fs";
import path from "path";

const uploadImage = async (filePath) => {
  try {
    if (!filePath) return null;

    const fileBuffer = fs.readFileSync(filePath);

    const ext = path.extname(filePath);
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}${ext}`;

    const { data, error } = await supabase.storage
      .from("products")
      .upload(fileName, fileBuffer, {
        contentType: `image/${ext.replace(".", "")}`,
        upsert: false,
      });

    if (error) {
      console.log("Supabase Upload Error:");
      console.dir(error, { depth: null });
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return publicUrlData.publicUrl;
  } catch (error) {
    console.log("Upload Error:");
    console.dir(error, { depth: null });

    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return null;
  }
};

export default uploadImage;