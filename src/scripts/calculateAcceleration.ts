export const calculateAcceleration = (route: dataPoint[], lastDataPoint) => {
    if (route.length < 2) {
        return 0;
    }
    const speedInMps = lastDataPoint.speed * 1000 / 3600; // Convert speed from km/h to m/s
    const lastSpeedInMps = route[route.length - 1].speed * 1000 / 3600; // Convert last speed from km/h to m/s
    const timeInSeconds = (Date.parse(lastDataPoint.timestamp) - Date.parse(route[route.length - 1].timestamp)) / 1000; // Convert time from milliseconds to seconds
    const acceleration = (speedInMps - lastSpeedInMps) / timeInSeconds; // Calculate acceleration in m/s²
    return acceleration;
}