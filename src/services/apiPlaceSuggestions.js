// Example using axios for API request

export async function getPlaceSuggestions(query) {
  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=d41a2c7c6df8426595fd0f868fc49e21`
    );

    const data = await res.json();
    return data.results.map((res) => res.formatted);
  } catch (error) {
    console.error("Error fetching place suggestions:", error);
    return [];
  }
}

export default getPlaceSuggestions;
