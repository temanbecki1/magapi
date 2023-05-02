import React from 'react';
import styles from '../index.module.css';

const UserCard = ({ user }) => {
  return (
    <div className={styles.card}>
      <h3>{user.firstname} {user.lastname}</h3>
      <p><span>ID:</span> {user.id}</p>
      <p><span>Email:</span> {user.email}</p>
      <p><span>Profession:</span> {user.profession}</p>
      <p><span>Date Created:</span> {new Date(user.dateCreated).toLocaleDateString()}</p>
      <p><span>Country:</span> {user.country}</p>
      <p><span>City:</span> {user.city}</p>
    </div>
  );
};

export default UserCard;
