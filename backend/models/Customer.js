import mongoose from "mongoose";
const productSchema = mongoose.Schema(
  {
    
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    postalCode: {
        type: String,
        required: true,
      },
    
    
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", productSchema);

export default Customer;
