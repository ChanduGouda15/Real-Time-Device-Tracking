const axios=require('axios')

exports.calculateDistanceAndETA=async(origin,destination)=>{
    const apiKey=process.env.ORS_API_KEY;
    const url = 'https://api.openrouteservice.org/v2/matrix/driving-car';

        try {
            const response = await axios.post(
                url,
                {
                    locations: [
                        [origin.lng, origin.lat],      // [lng, lat]
                        [destination.lng, destination.lat]
                    ],
                    metrics: ['distance', 'duration'],
                    units: 'km',
                },
                {
                    headers: {
                        Authorization: apiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            const distanceKm = response.data.distances[0][1]; // km
            const durationSec = response.data.durations[0][1]; // seconds
    
            return {
                distance: `${distanceKm.toFixed(2)} km`,
                duration: `${Math.round(durationSec / 60)} mins`,
            };
        } catch (error) {
            console.error(error.response?.data || error.message);
            throw new Error('Error calculating distance and ETA');
        }
}