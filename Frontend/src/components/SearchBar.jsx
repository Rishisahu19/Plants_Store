const SearchBar = ({ setSearch }) => {
  return (
    <input
      type="text"
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search plants..."
      className="border p-2 rounded w-full md:w-1/3"
    />
  );
};

export default SearchBar;
