export const calculateLateralG = (route: dataPoint[], lastDataPoint: dataPoint) => {
    if (route.length < 2) {
        return 0;
    }
    const previousDataPoint = route[route.length - 1];
    const deltaLat = lastDataPoint.lat - previousDataPoint.lat;
    const deltaLon = lastDataPoint.lon - previousDataPoint.lon;
    const deltaDirection = Math.atan2(deltaLat, deltaLon);
    const speedInMps = lastDataPoint.speed * 1000 / 3600; // Convert speed from km/h to m/s
    const lateralAcceleration = speedInMps * deltaDirection; // Calculate lateral acceleration
    const lateralG = lateralAcceleration / 9.81; // Convert to G-force
    return lateralG;
}