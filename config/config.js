const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    port: process.env.PORT || 3000
};
