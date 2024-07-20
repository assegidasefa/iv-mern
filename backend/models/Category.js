import mongoose from "mongoose";
const CategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);

// module.exports = Product;
export default Category;
