import React from "react";
import { redirect } from "react-router-dom";
import supabase from "../supabase";

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
      redirect("/login");
    }
  };

  return (
    <div>
      <p>Click the button below to log out:</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
