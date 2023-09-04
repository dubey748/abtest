import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserData {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
}

const UserDisplay: React.FC = () => {
  const [userList, setUserList] = useState<UserData[]>([]);

  // Function to fetch user data from the API
  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api?results=5'); 
      const users = response.data.results;
      setUserList(users);
      // Save data to local storage
      localStorage.setItem('userList', JSON.stringify(users));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Check if user data is already in local storage
    const storedUserList = localStorage.getItem('userList');
    if (storedUserList) {
      setUserList(JSON.parse(storedUserList));
    } else {
      // Fetch user data if not in local storage
      fetchUserData();
    }
  }, []);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', 
  };

  const tableStyle: React.CSSProperties = {
    border: '1px solid #ccc', 
  };

  return (
    <div style={containerStyle}>
      {userList.length > 0 ? (
        <>
          <h2>User Information</h2>
          <div style={tableStyle}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name.title} {user.name.first} {user.name.last}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={fetchUserData}>Refresh</button>
        </>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDisplay;
