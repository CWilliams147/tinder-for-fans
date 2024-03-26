import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import supabase from "../supabase";
import { Link } from "react-router-dom";

const ProfileDisplay = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const baseUrl =
    "https://oiqeacnqaafatdeoccav.supabase.co/storage/v1/object/public/profile-photos/";

  const fetchUserTeam = async () => {
    const userId = localStorage.getItem("user_id");
    console.log("Fetching user id for user:", userId);
    const { data } = await supabase
      .from("profile")
      .select("team")
      .eq("id", userId);
    const { team } = data[0];
    return team;
  };

  const fetchProfiles = async () => {
    const team = await fetchUserTeam();
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("team", team);

    if (error) {
      console.error("Error fetching profiles:", error.message);
      return;
    }

    setProfiles(data);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleNextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  return (
    <>
      <Nav />
      <div className="profile-display-container">
        {profiles.length > 0 ? (
          <>
            <div className="profile-display-card">
              <div className="profile-pic-display">
                <img
                  src={`${baseUrl}${profiles[currentIndex].profile_picture}`}
                  alt="Profile"
                />
              </div>
              <h2>{profiles[currentIndex].name}</h2>
              <div>Team: {profiles[currentIndex].team}</div>
              <button onClick={handleNextProfile}>Next Profile</button>
            </div>
          </>
        ) : (
          <>
            <div className="profile-display-message-container">
              <div className="profile-display-message1">
                Uh Oh... No Profiles Found for Team
              </div>
              <div className="profile-display-message2">
                Make Sure You've Created a Profile and are Signed In
              </div>
              <Link to="/register">
                <div className="login-register-button">Register Now</div>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileDisplay;
