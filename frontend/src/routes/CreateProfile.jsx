import React, { useState, useEffect } from "react";
import supabase from "../supabase";
import axios from "axios";

async function fetchTop50Teams() {
  const options = {
    method: "GET",
    // url: "https://api-football-v1.p.rapidapi.com/v3/teams",
    params: {
      country: "England",
    },
    headers: {
      "X-RapidAPI-Key": "1cf21f8c6bmshe9b2f507ab3ff31p1b4effjsn39fb01da858e",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const teams = response.data.response;
    const top50Teams = teams.slice(0, 50);
    return top50Teams;
  } catch (error) {
    throw new Error("Failed to fetch top 50 teams: " + error.message);
  }
}

export async function action(request) {
  try {
    const teamsData = await fetchTop50Teams();
    return teamsData;
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
}

const CreateProfile = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await action({});
        setTeams(teamsData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleTeamChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="onloading-background">
      <div className="create-profile-container">
        <h2>Create Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="create-profile-form">
            <div className="create-profile-inputs">
              <label>Select Team:</label>
              <select value={selectedTeam} onChange={handleTeamChange}>
                <option value="">Select Team</option>
                {teams.map((entry) => {
                  //   console.log("TEAM IS: ", entry.team);
                  return (
                    <option key={entry.team.team_id} value={entry.team.team_id}>
                      {entry.team.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="create-profile-inputs">
              <label>Upload Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </div>
          </div>
          <button type="submit">Create Profile</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
