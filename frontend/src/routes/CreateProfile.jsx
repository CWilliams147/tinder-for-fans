import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabase";
import axios from "axios";

async function fetchTop50Teams() {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/teams",
    params: { country: "England" },
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
  const [name, setName] = useState("");
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProfilePictureChange = async (e) => {
    const formData = new FormData(e.target.form);
    const photo = formData.get("profile_picture");

    const fileName = photo.name;
    const { data, error } = await supabase.storage
      .from("profile-photos")
      .upload(`ProfilePictures/${fileName}`, photo);
    console.log("data, or error", data, error);
    setProfilePicture(data.path);

    const { ExportedData } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(data.path);

    console.log("exported data", ExportedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("PROFILE PHOTO:", profilePicture);

    const { error } = await supabase
      .from("profile")
      .update({
        team: selectedTeam,
        profile_picture: profilePicture,
        name: name,
      })
      .eq("id", "c5b8eb93-80ab-404f-b44f-8b9c147d3c81");
    if (!profilePicture || !selectedTeam) {
      alert("Please select a team and a profile picture.");
      return;
    }

    try {
      if (error) throw error;

      alert("Profile created successfully!");
    } catch (error) {
      console.error("Error creating profile:", error.message);
    }
  };

  return (
    <div className="onloading-background">
      <div className="create-profile-container">
        <h2>Create Your Profile</h2>
        <form className="create-profile-form" onSubmit={handleSubmit}>
          <div className="create-profile-inputs">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="create-profile-inputs">
            <label>Select Team:</label>
            <select
              name="team"
              value={selectedTeam}
              onChange={handleTeamChange}
            >
              <option value="">Select Team</option>
              {teams.map((entry) => (
                <option key={entry.team.team_id} value={entry.team.team_id}>
                  {entry.team.name}
                </option>
              ))}
            </select>
          </div>
          <div className="create-profile-inputs">
            <label>Upload Profile Picture:</label>
            <input
              name="profile_picture"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </div>
          <Link to="/">
            <button className="create-profile-button" type="submit">
              Create Profile
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
