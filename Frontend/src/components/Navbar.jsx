import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-700 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">🌱 Mini Plant Store</h1>
      <div className="space-x-4">
        <Link to="/">Catalog</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
