const express = require('express');
const { fetchDirections, fetchDirectionsFromCoordinates } = require('../controllers/directionsController');

const router = express.Router();

router.get('/directions', fetchDirections);
router.get('/directions-from-coordinates',fetchDirectionsFromCoordinates);


module.exports = router;

//  http://localhost:3000/directions-shorturl?originShortUrl=rujuoc41ZXCWtyZKA&destinationShortUrl=Kx1HgKdWrueWs5Cp9