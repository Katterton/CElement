const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the build folder
app.use(express.static(path.join(__dirname,"public")));

// Serve index.html for all routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});