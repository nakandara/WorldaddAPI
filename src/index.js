import { app, server } from './app.js';


const PORT = process.env.PORT || 8080;

// Start the server in index.js
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});








