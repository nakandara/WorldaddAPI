import app from './app.js';
import fs from 'fs'
import https from 'https'

const port = process.env.PORT || 8080;



// Using ES6 arrow function to start the server and log a message
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});








