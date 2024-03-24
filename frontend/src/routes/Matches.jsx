import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import axios from "axios";

const Matches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const url =
          "https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2023";
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "1cf21f8c6bmshe9b2f507ab3ff31p1b4effjsn39fb01da858e",
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
          },
        };

        const response = await axios.request(url, options);
        if (response.data.response) {
          const upcomingMatches = response.data.response.filter(
            (match) => match.fixture.status.short === "NS"
          );
          setMatches(upcomingMatches);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="matches-container">
      <Nav />
      <div className="matches-list-background">
        <h2>Upcoming Matches</h2>
        <div className="matches">
          {matches && matches.length > 0 ? (
            <ul className="matches-ul">
              {matches.map((match) => (
                <li className="match-list-item" key={match.fixture.id}>
                  <div className="match-details">
                    Home Team: {match.teams.home.name} ({match.goals.home}) -
                    Away Team: {match.teams.away.name} ({match.goals.away})
                  </div>
                  <div className="match-details">
                    Date: {new Date(match.fixture.date).toLocaleString()}
                  </div>
                  <div className="match-details">
                    Venue: {match.fixture.venue.name},{" "}
                    {match.fixture.venue.city}
                  </div>
                  <div className="match-details">
                    Status: {match.fixture.status.long}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming matches available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matches;
