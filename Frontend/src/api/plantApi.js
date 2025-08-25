const API_BASE = import.meta.env.VITE_API_URL;

// Fetch plants (searchTerm works for both name/category)
export const fetchPlants = async (searchTerm = "") => {
  const query = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : "";
  const res = await fetch(`${API_BASE}/api/plants${query}`);
  if (!res.ok) throw new Error("Failed to fetch plants");
  return res.json();
};

// Add a new plant
export const addPlant = async (plantData) => {
  const res = await fetch(`${API_BASE}/api/plants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plantData),
  });
  if (!res.ok) throw new Error("Failed to add plant");
  return res.json();
};
