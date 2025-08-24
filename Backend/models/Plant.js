import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categories: [{ type: String }],
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Plant = mongoose.model("Plant", plantSchema);
export default Plant;
