export interface dataPoint {
    id: number;
    routeId: number;
    lat: number;
    lon: number;
    lean: number;
    lateralG: number;
    acceleration: number;
    timestamp: number;
    speed: number;
}