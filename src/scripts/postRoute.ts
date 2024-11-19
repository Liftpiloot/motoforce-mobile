import { API_URL } from "@/config.js";

export const postRoute = async (userId: number) => {
  const response = await fetch(`${API_URL}/Route/postRoute?userId=${userId}`, {
    method: "POST",
    headers: {
      "accept": "*/*",
    },
    body: "",
  });

  if (!response.ok) {
    throw new Error("Failed to post route");
  }

  const { routeId} = await response.json();
  return routeId;
};