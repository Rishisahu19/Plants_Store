import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";

const Catalog = () => {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch plants from API
  const fetchPlants = async (query = "") => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/plants`,
        { params: { search: query } }
      );

      const data = res.data;
      setPlants(Array.isArray(data) ? data : data.plants || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch plants. Please try again later.");
      setPlants([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((query) => fetchPlants(query), 500),
    []
  );

  // On search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Initial fetch
  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Plant Catalog</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search plants..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-3 border border-gray-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">Loading plants...</p>}

      {/* Plant List */}
      {!loading && plants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <div
              key={plant._id}
              className="p-4 border rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-semibold">{plant.name}</h2>
              <p className="text-gray-600">{plant.description}</p>
              <p className="font-bold mt-2">₹{plant.price}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-500">No plants found.</p>
      )}
    </div>
  );
};

export default Catalog;
