import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Artist from '../components/Artist';

function ArtistPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Artist Page</h1>
      <Artist id={id} />
    </div>
  );
}

export default ArtistPage;
