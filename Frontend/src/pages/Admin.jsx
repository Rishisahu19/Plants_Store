import React, { useState } from "react";
import { addPlant } from "../api/plantApi";
import { toast } from "react-toastify";

const Admin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [availability, setAvailability] = useState("Yes");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !categories) {
      toast.warning("All fields are required!");
      return;
    }

    const newPlant = {
      name,
      price: Number(price),
      categories: categories.split(",").map((c) => c.trim()),
      availability: availability === "Yes",
    };

    try {
      setLoading(true);
      await addPlant(newPlant);
      toast.success("Plant added successfully!");
      setName(""); setPrice(""); setCategories(""); setAvailability("Yes");
    } catch {
      toast.error("Failed to add plant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Plant</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md"
      >
        <input
          type="text"
          placeholder="Plant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Categories (comma separated)"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Yes">Available</option>
          <option value="No">Out of Stock</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } text-white py-2 px-4 rounded`}
        >
          {loading ? "Adding..." : "Add Plant"}
        </button>
      </form>
    </div>
  );
};

export default Admin;
