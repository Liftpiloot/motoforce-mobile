import {getDistanceFromLatLonInKm} from "./getDistanceFromLatLonInKm";

export const calculateSpeed = (route: dataPoint[], lastDatapoint:dataPoint) => {
    if (route.length === 0) {
        return 0;
    }
    const distance = getDistanceFromLatLonInKm(route[route.length - 1].lat, route[route.length - 1].lon, lastDatapoint.lat, lastDatapoint.lon);
    const timeInHours = (Date.parse(lastDatapoint.timestamp) - Date.parse(route[route.length - 1].timestamp)) / (1000 * 60 * 60); // Convert time from milliseconds to hours
    return distance / timeInHours;
}