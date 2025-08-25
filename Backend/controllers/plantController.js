import Plant from "../models/Plant.js";

// ✅ Get plants (with search, name, category support)
export const getPlants = async (req, res, next) => {
  try {
    const { name, category, search } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { categories: { $in: [new RegExp(search, "i")] } } // ✅ Fix for array
      ];
    } else {
      if (name) query.name = { $regex: name, $options: "i" };
      if (category) query.categories = { $in: [new RegExp(category, "i")] }; // ✅ Fix for array
    }

    const plants = await Plant.find(query).sort({ createdAt: -1 });
    res.json(plants);
  } catch (error) {
    console.error("❌ Error in getPlants:", error.message);
    next(error);
  }
};

// ✅ Add new plant
export const addPlant = async (req, res, next) => {
  try {
    const { name, price, categories, availability } = req.body;

    if (!name || !price) {
      res.status(400);
      throw new Error("Name and Price are required");
    }

    const newPlant = new Plant({
      name,
      price,
      categories,
      availability,
    });

    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant);
  } catch (error) {
    console.error("❌ Error in addPlant:", error.message);
    next(error);
  }
};
