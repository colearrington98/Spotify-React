import React, { useState } from 'react';
import spotifyApi from '../spotify';
import styles from './Search.module.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await spotifyApi.search(searchTerm);
      setSearchResults(response);
    } catch (error) {
      console.log('Error occurred while searching:', error);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleSearch} className={styles.button}>
        Search
      </button>
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
