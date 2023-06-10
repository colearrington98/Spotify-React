import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Album from '../components/Album';

function AlbumPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Album Page</h1>
      <Album id={id} />
    </div>
  );
}

export default AlbumPage;
