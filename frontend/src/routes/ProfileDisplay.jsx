import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import supabase from "../supabase";

const ProfileDisplay = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const baseUrl =
    "https://oiqeacnqaafatdeoccav.supabase.co/storage/v1/object/public/profile-photos/";

  const fetchUserTeam = async () => {
    const userId = localStorage.getItem("user_id");
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
      <div>
        {profiles.length > 0 ? (
          <>
            <div>
              <h2>{profiles[currentIndex].name}</h2>
              <img
                className="profile-pic-display"
                src={`${baseUrl}${profiles[currentIndex].profile_picture}`}
                alt="Profile"
              />
              <div>Team: {profiles[currentIndex].team}</div>
            </div>
            <button onClick={handleNextProfile}>Next Profile</button>
          </>
        ) : (
          <p>No profiles found for team.</p>
        )}
      </div>
    </>
  );
};

export default ProfileDisplay;
