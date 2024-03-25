import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./nav.css";

const Nav = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-kickoff">
        <button>Kickoff</button>
      </div>
      <div className="nav-matches">
        <Link to="/matches">
          <button>Matches</button>
        </Link>
      </div>
      <div className="nav-squad">
        <Link to="/squad">
          <button>Squad</button>
        </Link>
      </div>
      <div className="nav-contact">
        <Link to="/contact">
          <button>Get in Touch</button>
        </Link>
      </div>
    </nav>
  );
};
export default Nav;
