const API_BASE = import.meta.env.VITE_API_URL; 

export const fetchPlants = async (searchTerm = "") => {
  const query = searchTerm ? `?name=${encodeURIComponent(searchTerm)}` : "";
  const res = await fetch(`${API_BASE}/api/plants${query}`); // ✅ note /api
  if (!res.ok) throw new Error("Failed to fetch plants");
  return res.json();
};

export const addPlant = async (plantData) => {
  const res = await fetch(`${API_BASE}/api/plants`, { // ✅ note /api
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plantData),
  });
  if (!res.ok) throw new Error("Failed to add plant");
  return res.json();
};
