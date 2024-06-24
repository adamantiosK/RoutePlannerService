const express = require('express');
const directionsRoute = require('./routes/directions');
const { port } = require('./config/config');

const app = express();

app.use(express.json());
app.use('/', directionsRoute);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
