const { getDirections } = require('../services/googleMapsService');

const fetchDirections = async (req, res) => {
    const { origin, destination, mode, departureTime } = req.query;


    if (!origin || !destination) {
        return res.status(400).send('Origin and destination are required');
    }

    try {
        const directions = await getDirections(origin, destination, mode, departureTime);
        res.json(formatDirectionsResponse(directions));
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

const fetchDirectionsFromCoordinates = async (req, res) => {
    // const { originLat, originLng, destinationLat, destinationLng } = req.query;
    const { origin, destination, mode, departureTime } = req.query;

    if (!origin || !destination ) {
        return res.status(400).send('Origin and destination coordinates are required');
    }

    try {
        const directions = await getDirections(origin, destination, mode, departureTime);

        res.json(formatDirectionsResponse(directions));
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

const formatDirectionsResponse = (directions) => {
    return {
        start_address: directions.start_address,
        end_address: directions.end_address,
        duration: directions.duration.text,
        distance: directions.distance.text,
        steps: directions.steps.map(step => ({
            travel_mode: step.travel_mode,
            instructions: step.html_instructions,
            duration: step.duration.text,
            distance: step.distance.text,
            ...(step.transit_details ? {
                departure_stop: step.transit_details.departure_stop.name,
                arrival_stop: step.transit_details.arrival_stop.name,
                departure_time: step.transit_details.departure_time.text,
                arrival_time: step.transit_details.arrival_time.text,
                line_name: step.transit_details.line.name,
                line_short_name: step.transit_details.line.short_name,
                vehicle_type: step.transit_details.line.vehicle.type
            } : {})            
        })),
        departure_time: directions.departure_time ? directions.departure_time.text : null,
            arrival_time: directions.arrival_time ? directions.arrival_time.text : null
    };
};

module.exports = {
    fetchDirections,
    fetchDirectionsFromCoordinates
};
