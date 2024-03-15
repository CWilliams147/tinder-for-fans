import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./nav.css";

const Nav = () => {
  return (
    <header className="nav-bar">
      <div>
        <Link to="/matches">
          <button className="kickoff">Kickoff</button>
        </Link>
      </div>
      <div>
        <button className="matches">Matches</button>
      </div>
      <div>
        <button className="squad">Squad</button>
      </div>
      <div>
        <button className="contact">Get in Touch</button>
      </div>
    </header>
  );
};
export default Nav;
