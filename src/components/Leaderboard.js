import "../styles/Leaderboard.css";
import { db } from "../index";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import formatTime from "../helper/FormatTime";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  //boolean state variables to signal if data is loading and if error has occurred
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function refreshPage() {
    window.location.reload();
  }

  useEffect(() => {
    async function fetchData() {
      //shows loading screen while loading
      setIsError(false);
      setIsLoading(true);
      try {
        let dataArray = [];
        const querySnapshot = await getDocs(collection(db, "Leaderboard"));
        querySnapshot.forEach((doc) => {
          dataArray = [
            ...dataArray,
            { name: doc.data().name, time: doc.data().time, id: doc.id },
          ];
        });
        setUsers(dataArray);
      } catch (error) {
        //for showing an error message if error occurs
        setIsError(true);
      }
      //removes loading screen after data is fetched
      setIsLoading(false);
    }

    fetchData();
  }, []);

  //loading spinner
  const loading = isLoading ? (
    <div className="loading">
      Loading{" "}
      <svg
        className="spinner-container"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="circle" cx="50" cy="50" r="42" />
      </svg>
    </div>
  ) : (
    false
  );

  //error message
  const errorMessage = isError ? (
    <div className="error-message">
      Uh Oh... Something went wrong. Please try again
      <button className="refresh-button" onClick={refreshPage}>
        Refresh
      </button>
    </div>
  ) : (
    false
  );

  //Sorts the users by the quickest times
  const sortedUsers = users.sort((u1, u2) => {
    return u1.time - u2.time;
  });
  //If there are more than 100 entries, it limits the array to the top 100
  const top100 = sortedUsers.slice(0, 100);
  //Renders the top 100 users in the table
  const tableData = top100.map((user, index) => (
    <tr key={user.id}>
      <td>{index + 1}</td>
      <td className="table-name">{user.name}</td>
      <td>{formatTime(user.time)}</td>
    </tr>
  ));

  //Renders the table is loading is done or there's no error fetching data
  const table =
    isLoading || isError ? (
      false
    ) : (
      <table className="leaderboard-table">
        <caption>Top 100 Leaderboard</caption>
        <thead>
          <tr>
            <th>Place</th>
            <th className="table-name">Username</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    );

  return (
    <div className="leaderboard-container">
      {loading}
      {errorMessage}
      {table}
    </div>
  );
}
