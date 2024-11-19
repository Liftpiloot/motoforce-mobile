import { API_URL } from "@/config";
import {dataPoint} from "./composableDataPoint";

export interface Route {
    id: number;
    userId: number;
    distance: number;
    dataPoints: dataPoint[];
}

export const ComposableRoute = () => {

    async function get(routeId: number): Promise<{ route: Route}> {
        const response = await fetch(`${API_URL}/Route?routeId=${routeId}`, {
            method: "GET",
            headers:
            {
                'content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get route");
        }
        return await response.json();
    }

    async function deleteRoute(routeId: number): Promise<any> {
        const response = await fetch(`${API_URL}/Route?routeId=${routeId}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete route");
        }
    }

    async function getMaxSpeed(routeId: number): Promise<any> {
        const response = await fetch(`${API_URL}/Route/MaxSpeed?routeId=${routeId}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get route max speed");
        }
        const { maxSpeed } = await response.json();
        console.log(maxSpeed);
        return maxSpeed;
    }

    async function getMaxLean(routeId: number): Promise<any> {
        const response = await fetch(`${API_URL}/Route/MaxLean?routeId=${routeId}`, {
            method: "GET",
            headers: {
                "accept": "*/*",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get route max lean");
        }
        const { maxLean } = await response.json();
        return maxLean;
    }

    async function getMaxG(routeId: number): Promise<any> {
        const response = await fetch(`${API_URL}/Route/MaxG?routeId=${routeId}`, {
            method: "GET",
            headers: {
                "accept": "*/*",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get route max G");
        }
        const { maxG } = await response.json();
        return maxG;
    }

    return {
        get,
        deleteRoute,
        getMaxSpeed,
        getMaxLean,
        getMaxG,
    }
}