import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  return (
    <div className="navbar flex justify-between shadow-lg bg-primary text-primary-content">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <ThemeSwitch />
    </div>
  );
};

export default Navbar;
