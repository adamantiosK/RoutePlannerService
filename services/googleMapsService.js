const axios = require('axios');
const { googleMapsApiKey } = require('../config/config');

const getDirections = async (origin, destination, mode = 'driving', departureTime = 'now') => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
            params: {
                origin,
                destination,
                mode,
                departure_time: departureTime === 'now' ? 'now' : new Date(departureTime).getTime() / 1000,
                key: googleMapsApiKey
            }
        });

        if (response.data.status !== 'OK') {
            throw new Error(response.data.error_message || 'Error fetching directions');
        }

        return response.data.routes[0].legs[0];
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports = {
    getDirections
};
