import React, { useEffect, useState } from 'react';
import spotifyApi from '../spotify';
import styles from './UserProfile.module.css';

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await spotifyApi.getUserProfile();
        setUser(userData);
      } catch (error) {
        console.log('Error occurred while fetching user profile:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={styles.container}>
      {user && (
        <div className={styles.user-profile}>
          <img
            src={user.image}
            alt={user.name}
            className={styles.user-image}
          />
          <h1 className={styles.user-name}>{user.name}</h1>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
