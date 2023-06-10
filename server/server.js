import express from 'express';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import App from './src/App';

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, 'build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  const context = {};
  const appMarkup = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

    // context.url will contain the URL to redirect to if a <Redirect> was used
  fs.readFile(path.resolve(__dirname, 'build', 'index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, something went wrong!');
    }

    return res.send(data.replace('<div id="root"></div>', `<div id="root">${appMarkup}</div>`));
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

