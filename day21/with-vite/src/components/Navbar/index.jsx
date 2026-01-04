import Style from "./navbar.module.css";

const navbarItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Services",
    link: "/services",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const Navbar = () => {
  const isAuthenticated = true;
  return (
    <nav className={Style.navbar}>
      <div className={Style["navbar-container"]}>
        <div className={Style["navbar-logo"]}>
          <a href="/">MyLogo</a>
        </div>
        <ul className={Style["navbar-menu"]}>
          {navbarItems.map((item, index) => {
            return (
              <li key={index} className={Style["navbar-item"]}>
                <a href={item.link} className={Style["navbar-link"]}>
                  {item.name}
                </a>
              </li>
            );
          })}

          {/* <li className={Style["navbar-item"]}>
            <a href="/about" className={Style["navbar-link"]}>
              About
            </a>
          </li>
          <li className={Style["navbar-item"]}>
            <a
              href="/services"
              className={Style["navbar-link"]}
              style={{
                color: isAuthenticated ? "green" : "red",
                borderBottom: isAuthenticated
                  ? "2px solid green"
                  : "2px solid red",
              }}
            >
              Services
            </a>
          </li> */}

          {/* {isAuthenticated && (
            <li className="navbar-item">
              <a href="/contact" className="navbar-link">
                Contact
              </a>
            </li>
          )}

          {isAuthenticated ? (
            <li className="navbar-item">
              <a href="/contact" className="navbar-link">
                Contact
              </a>
            </li>
          ) : null}

          <li className="navbar-item">
            {isAuthenticated ? <button>Logout</button> : <button>Login</button>}
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
