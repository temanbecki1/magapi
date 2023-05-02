import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUsers = async (searchParams) => {
  const response = await axios.get('http://localhost:3000/users/search', { params: searchParams });
  return response.data;
};

const UsersSearch = () => {
  const [searchParams, setSearchParams] = useState({});
  const { data: users, isLoading, error } = useQuery(['users', searchParams], () => fetchUsers(searchParams), {
    enabled: !!Object.keys(searchParams).length,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Search Users</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name:</label>
        <input type="text" name="firstname" onChange={handleChange} />
        <label htmlFor="lastname">Last Name:</label>
        <input type="text" name="lastname" onChange={handleChange} />
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" onChange={handleChange} />
        <label htmlFor="profession">Profession:</label>
        <input type="text" name="profession" onChange={handleChange} />
        <label htmlFor="country">Country:</label>
        <input type="text" name="country" onChange={handleChange} />
        <label htmlFor="city">City:</label>
        <input type="text" name="city" onChange={handleChange} />
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {users && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{`${user.firstname} ${user.lastname} (${user.email}) - ${user.profession}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersSearch;
