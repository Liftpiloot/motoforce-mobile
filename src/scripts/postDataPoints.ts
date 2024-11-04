import { API_URL } from "@/config.js";

export const postDataPoints = async (dataPoints) => {
  const response = await fetch(`${API_URL}/Route/postDataPoints`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataPoints),
  });

  if (!response.ok) {
    throw new Error("Failed to post data points");
  }
};
