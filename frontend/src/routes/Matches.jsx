// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Matches = () => {
//   const [matches, setMatches] = useState([]);

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const url =
//           "https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2020";
//         const options = {
//           method: "GET",
//           headers: {
//             "X-RapidAPI-Key":
//               "1cf21f8c6bmshe9b2f507ab3ff31p1b4effjsn39fb01da858e",
//             "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
//           },
//         };

//         const response = await axios.request(url, options);
//         const {
//           response: { fixtures },
//         } = response.data;
//         setMatches(fixtures);
//       } catch (error) {
//         console.error("Error fetching matches:", error);
//       }
//     };

//     fetchMatches();
//   }, []);

//   return (
//     <div>
//       <h2>Matches</h2>
//       {matches && matches.length > 0 ? (
//         <ul>
//           {matches.map((match) => (
//             <li key={match.fixture.id}>
//               <p>Date: {new Date(match.fixture.date).toLocaleString()}</p>
//               <p>
//                 Venue: {match.fixture.venue.name}, {match.fixture.venue.city}
//               </p>
//               <p>Status: {match.fixture.status.long}</p>
//               <p>
//                 Home Team: {match.teams.home.name} ({match.goals.home}) - Away
//                 Team: {match.teams.away.name} ({match.goals.away})
//               </p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No matches available</p>
//       )}
//     </div>
//   );
// };

// export default Matches;
