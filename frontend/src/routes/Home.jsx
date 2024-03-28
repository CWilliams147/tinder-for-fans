import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Nav from "../components/Nav";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="page-home">
        <div className="home-title">Connect on the</div>
        <div className="home-title2">Pitch!</div>
        <div className="home-subtitle">
          Connect With Other Fans and Find your Football Tribe.
        </div>
        <Link to="/register">
          <button className="home-button">
            <span>Join the League</span>
          </button>
        </Link>
        <img
          src="https://oiqeacnqaafatdeoccav.supabase.co/storage/v1/object/public/home-image/home"
          alt="Football Fans Together"
          className="home-img"
        />
      </div>
    </>
  );
};
export default Home;
