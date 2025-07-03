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

exports.getRoute=async(req,res)=>{
    const {start,end}=req.body;
    const apiKey=process.env.ORS_API_KEY;
    const url='https://api.openrouteservice.org/v2/directions/driving-car/geojson';
    try {
        const response=await axios.post(
            url,
            {
                coordinates: [
                    [start.lng,start.lat],
                    [end.lng,end.lat]
                ]
            },
            {
                headers:{
                    Authorization:apiKey,
                    'Content-Type':'application/json'
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching route', error: error.response?.data || error.message });
    }
}