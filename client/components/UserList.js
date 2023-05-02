import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

const UserList = ({ users }) => {
  return (
    <div>
      <h2>User List</h2>
      <div>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
