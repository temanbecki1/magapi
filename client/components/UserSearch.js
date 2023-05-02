import React, { useState } from 'react';
import axios from 'axios';
import UserList from './UserList';

const UserSearch = () => {
  const [searchParams, setSearchParams] = useState({
    firstname: '',
    lastname: '',
    email: '',
    profession: '',
    country: '',
    city: '',
  });
  const [users, setUsers] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('/api/users/search', { params: searchParams });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
      <h2>User Search</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstname" value={searchParams.firstname} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastname" value={searchParams.lastname} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={searchParams.email} onChange={handleChange} />
        </label>
        <label>
          Profession:
          <input type="text" name="profession" value={searchParams.profession} onChange={handleChange} />
        </label>
        <label>
          Country:
          <input type="text" name="country" value={searchParams.country} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={searchParams.city} onChange={handleChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      <UserList users={users} />
    </div>
  );
};

export default UserSearch;
