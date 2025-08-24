const PlantCard = ({ plant }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
      <img
        src={plant.image || "https://via.placeholder.com/150"}
        alt={plant.name}
        className="rounded mb-2"
      />
      <h2 className="font-semibold text-lg">{plant.name}</h2>
      <p className="text-gray-600">₹{plant.price}</p>
      <div className="mt-2">
        {plant.categories.map((cat, i) => (
          <span
            key={i}
            className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded mr-2"
          >
            {cat}
          </span>
        ))}
      </div>
      <p
        className={`mt-2 font-medium ${
          plant.availability ? "text-green-600" : "text-red-600"
        }`}
      >
        {plant.availability ? "In Stock" : "Out of Stock"}
      </p>
    </div>
  );
};

export default PlantCard;
