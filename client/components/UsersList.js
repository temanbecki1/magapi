import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUsers = async () => {
  const response = await axios.get('http://localhost:3000/users');
  return response.data;
};

const UsersList = () => {
  const { data: users, isLoading, error } = useQuery('users', fetchUsers);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Users List</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Profession</th>
            <th>Date Created</th>
            <th>Country</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.profession}</td>
              <td>{new Date(user.dateCreated).toLocaleDateString()}</td>
              <td>{user.country}</td>
              <td>{user.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
