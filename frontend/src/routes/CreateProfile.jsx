import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

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
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      const fileName = file.name;
      const { data, error } = await supabase.storage
        .from("profile-photos")
        .upload(`ProfilePictures/${fileName}`, file);

      console.log("data, or error", data, error);
      if (data) {
        setProfilePicture(data.path);
      }
    }
  };

  const handleBioChange = (e) => {
    const words = e.target.value.split(/\s+/);
    if (words.length <= 25 || e.target.value.endsWith(" ")) {
      setBio(e.target.value);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("PROFILE PHOTO:", profilePicture);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("USER ID:", user.id);

    const { error } = await supabase
      .from("profile")
      .update({
        team: selectedTeam,
        profile_picture: profilePicture,
        name: name,
        bio: bio,
        location: location,
      })
      .eq("id", user.id);
    if (!profilePicture || !selectedTeam) {
      alert("Please select a team and a profile picture.");
      return;
    }

    try {
      if (error) throw error;

      console.log("Profile created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating profile:", error.message);
    }
  };

  return (
    <div className="onloading-background">
      <div className="create-profile-container">
        <h2>Create Your Profile</h2>
        <div className="create-profile-image-container">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="create-profile-image"
            />
          )}
        </div>
        <form className="create-profile-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="create-profile-inputs">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              placeholder="Enter Name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="create-profile-input-container"
            />
          </div>
          <div className="create-profile-inputs">
            <label htmlFor="location">Location:</label>
            <input
              id="location"
              name="location"
              placeholder="City, State"
              type="text"
              value={location}
              onChange={handleLocationChange}
              className="create-profile-input-container"
            />
          </div>
          <div className="create-profile-inputs">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Max 25 words"
              value={bio}
              onChange={handleBioChange}
              className="create-profile-input-container"
            ></textarea>
          </div>
          <div className="create-profile-inputs">
            <label>Select Team:</label>
            <select
              name="team"
              value={selectedTeam}
              onChange={handleTeamChange}
              className="create-profile-input-container"
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
              class="cssbuttons-io-button"
            />
          </div>
          <button className="create-profile-button" type="submit">
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
