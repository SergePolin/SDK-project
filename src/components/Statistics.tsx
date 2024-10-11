// import React from "react";
// import { Statistics } from "../types";
// import { fetchStatistics } from "../services/api";
// import { useEffect, useState } from "react";
// // import { PageTitle, Card } from "../styles/shared";
// import styled from "styled-components";

// // const StatCard = styled(Card)`
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   flex-wrap: wrap;

// //   h3 {
// //     color: #4a90e2;
// //     margin: 0;
// //   }

// //   p {
// //     font-size: 2rem;
// //     font-weight: bold;
// //     color: #333;
// //   }

// //   @media (max-width: 768px) {
// //     flex-direction: column;
// //     align-items: flex-start;

// //     h3 {
// //       margin-bottom: 5px;
// //     }

// //     p {
// //       font-size: 1.5rem;
// //     }
// //   }
// // `;

// const StatisticsComponent: React.FC = () => {
//   const [stats, setStats] = useState<Statistics | null>(null);
//   useEffect(() => {
//     fetchStatistics().then((response) => {
//       if (Array.isArray(response.data)) {
//         setStats(response.data[0]); // Assuming we want the first item if it's an array
//       } else {
//         setStats(response.data);
//       }
//     });
//   }, []);

//   return (
//     <div>
//       <PageTitle>Statistics</PageTitle>
//       {stats && (
//         <>
//           <StatCard>
//             <h3>Total Workouts</h3>
//             <p>{stats.totalWorkouts}</p>
//           </StatCard>
//           <StatCard>
//             <h3>Total Duration</h3>
//             <p>{stats.totalDuration} minutes</p>
//           </StatCard>
//         </>
//       )}
//     </div>
//   );
// };

// export default StatisticsComponent;
