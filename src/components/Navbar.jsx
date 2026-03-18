import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div className="navbar">
      <h2>HDX Panel</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;