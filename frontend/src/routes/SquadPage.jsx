import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import axios from "axios";

const SquadPage = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch teams to populate the dropdown
    const fetchTeams = async () => {
      const url =
        "https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2023";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "1cf21f8c6bmshe9b2f507ab3ff31p1b4effjsn39fb01da858e",
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(url, options);
        if (response.data.response) {
          setTeams(
            response.data.response.map((team) => ({
              id: team.team.id,
              name: team.team.name,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      // Fetch players for the selected team
      const fetchPlayers = async () => {
        const url = `https://api-football-v1.p.rapidapi.com/v3/players?team=${selectedTeam}&season=2023`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "1cf21f8c6bmshe9b2f507ab3ff31p1b4effjsn39fb01da858e",
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
          },
        };

        try {
          const response = await axios.request(url, options);
          if (response.data.response) {
            setPlayers(response.data.response.map((player) => player.player));
          }
        } catch (error) {
          console.error("Error fetching players:", error);
        }
      };

      fetchPlayers();
    }
  }, [selectedTeam]);

  const handleTeamChange = (e) => {
    setSelectedTeam(e.target.value);
    setPlayers([]); // Clear players on team change
  };

  return (
    <>
      <Nav />
      <div className="squad-container">
        <h2>Team Squad</h2>
        <select value={selectedTeam} onChange={handleTeamChange}>
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        <div className="player-list">
          {players.length > 0 ? (
            <ul>
              {players.map((player, index) => (
                <li key={index}>
                  {player.name} - {player.position}
                </li>
              ))}
            </ul>
          ) : (
            selectedTeam && <p>Loading players...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SquadPage;
