import React from "react";
import { redirect, Link } from "react-router-dom";
import supabase from "../supabase";
import Nav from "../components/Nav";

export async function action() {
  try {
    await supabase.auth.signOut();
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("Error logging out:", error.message);
    return false;
  }
}

const Logout = () => {
  const handleLogout = async () => {
    const logoutSuccess = await action();
    if (logoutSuccess) {
      redirect("/");
    }
  };

  return (
    <>
      <Nav />
      <div>
        <p>Click the button below to log out:</p>
        <Link to="/">
          <button onClick={handleLogout}>Logout</button>
        </Link>
      </div>
    </>
  );
};

export default Logout;
