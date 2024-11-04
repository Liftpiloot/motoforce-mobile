export const calculateLean = (route: dataPoint[], lastDataPoint: dataPoint) => {
    if (route.length < 2) {
        return 0;
    }
    const lateralG = lastDataPoint.lateralG;
    const leanAngle = Math.atan(lateralG / 9.81) * (180 / Math.PI); // Convert radians to degrees
    return leanAngle;
}