import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./nav.css";

const Nav = () => {
  return (
    <nav className="nav-bar">
      <div className="kickoff">
        <button>Kickoff</button>
      </div>
      <div className="matches">
        <Link to="/matches">
          <button>Matches</button>
        </Link>
      </div>
      <div className="squad">
        <button>Squad</button>
      </div>
      <div className="contact">
        <button>Get in Touch</button>
      </div>
    </nav>
  );
};
export default Nav;
