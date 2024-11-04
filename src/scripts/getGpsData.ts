interface GpsData {
    lat: number;
    lng: number;
    time: number;
}

export const clearWatch = (watchId: number) => {
    navigator.geolocation.clearWatch(watchId);
}

export const watchGpsData = (successCallback: (location: { lat: number; lng: number }) => void, errorCallback: (error: GeolocationPositionError) => void) : number | undefined => {
    if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
    }

    const watchId = navigator.geolocation.watchPosition(
        (position) => {
            console.log("Position retrieved:", position);
            successCallback({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        },
        (error) => {
            console.error("Error code:", error.code);
            console.error("Error message:", error.message);
            errorCallback(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        }
    );
    return watchId;
};