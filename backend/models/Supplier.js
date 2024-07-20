import mongoose from "mongoose";
const SupplierSchema = mongoose.Schema(
  {
    supplierName: { type: String, required: true },
    contactName: { type: String ,required: true},
    address: { type: String ,required: true},
    city: { type: String ,required: true},
    postalCode: { type: String ,required: true},
    country: { type: String ,required: true},
    phone: { type: String ,required: true},
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model("Supplier", SupplierSchema);

// module.exports = Product;
export default Supplier;
