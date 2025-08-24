export const getPlants = async (req, res, next) => {
  try {
    const { name, category, search } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { categories: { $regex: search, $options: "i" } }
      ];
    } else {
      if (name) query.name = { $regex: name, $options: "i" };
      if (category) query.categories = { $regex: category, $options: "i" };
    }

    const plants = await Plant.find(query).sort({ createdAt: -1 });
    res.json(plants);
  } catch (error) {
    next(error);
  }
};

export const addPlant = async (req, res, next) => {
  try {
    const { name, price, categories, availability } = req.body;

    if (!name || !price) {
      res.status(400);
      throw new Error("Name and Price are required");
    }

    const newPlant = new Plant({ name, price, categories, availability });
    const savedPlant = await newPlant.save();

    res.status(201).json(savedPlant);
  } catch (error) {
    next(error); // Pass to global error handler
  }
};
