import Map from '../models/Map.js';

export const getAllDevelopersNearMe = async (request) => {
    try {
        const longitude = request.params.longitude;
        const latitude = request.params.latitude;
        const allProfiles = await Map.find(
            {
                location:
                {
                    $near:
                    {
                        $geometry: { type: "Point", coordinates: [longitude, latitude] },
                        $minDistance: 0,
                        $maxDistance: 5000
                    }
                }
            }
        ).populate('user', ['username', 'name']);
        let developersNearMe = [];
        allProfiles.forEach(element => {
            if (element.user._id != request.user.id) {
                developersNearMe.push({
                    "longitude": element.location.coordinates[0],
                    "latitude": element.location.coordinates[1],
                    "userId": element.user._id,
                    "userName": element.user.username,
                    "name": element.user.name
                })
            }

        });
        let response = { statusCode: 200, message: developersNearMe };
        return response;
    }
    catch (e) {
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}