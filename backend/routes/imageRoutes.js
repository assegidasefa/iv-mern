import express from "express";
const imageRouter = express.Router();
import { upload } from "../middleware/uploadMiddleware.js";
import Image from "../models/Image.js";

imageRouter.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      filename: req.file.filename,
      path: req.file.path,
    });
    const savedImage = await newImage.save();
    res
      .status(201)
      .json({ message: "Image uploaded successfully", image: savedImage });
  } catch (error) {
    res.status(500).json({ message: "Image upload failed", error });
  }
});

export default imageRouter;
