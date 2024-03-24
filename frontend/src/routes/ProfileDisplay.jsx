import React, { useState, useEffect } from "react";
import supabase from "../supabase";

const ProfileDisplay = ({ team }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch profiles from Supabase
  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("team", team);

    console.log(data, error); // Add this line to log data and errors

    if (error) {
      console.error("Error fetching profiles:", error.message);
      return;
    }

    setProfiles(data);
  };

  // Effect to fetch profiles on component mount and team change
  useEffect(() => {
    fetchProfiles();
  }, [team]);

  // Function to handle cycling through profiles
  const handleNextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  // Display the current profile, or a message if no profiles are available
  return (
    <div>
      {profiles.length > 0 ? (
        <>
          <div>
            <h2>{profiles[currentIndex].name}</h2>
            <img src={profiles[currentIndex].profile_picture} alt="Profile" />
            <p>Team: {profiles[currentIndex].team}</p>
          </div>
          <button onClick={handleNextProfile}>Next Profile</button>
        </>
      ) : (
        <p>No profiles found for team {team}.</p>
      )}
    </div>
  );
};

export default ProfileDisplay;
