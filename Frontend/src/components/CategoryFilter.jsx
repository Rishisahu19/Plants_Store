const CategoryFilter = ({ category, setCategory }) => {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="border p-2 rounded mt-2 md:mt-0"
    >
      <option value="">All Categories</option>
      <option value="Indoor">Indoor</option>
      <option value="Outdoor">Outdoor</option>
      <option value="Succulent">Succulent</option>
      <option value="Air Purifying">Air Purifying</option>
      <option value="Home Decor">Home Decor</option>
    </select>
  );
};

export default CategoryFilter;
