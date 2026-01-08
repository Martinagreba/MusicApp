import axios from "axios";

type Artist = {
  id: number;
  name: string;
};
const api = axios.create({
  baseURL: "https://api.deezer.com",
  timeout: 3000,
});

export const getGenre = async () => {
  const response = await api.get("/genre");
  return response.data.data;
};

export const getTracksByGenre = async (genreId: number) => {
  try {
    const artistsResponse = await api.get(`/genre/${genreId}/artists`);
    const artists = artistsResponse.data?.data ?? [];

    if (!artists.length) return [];

    const artistsToFetch = artists.slice(0, 10);

    const trackArray = await Promise.all(
      artistsToFetch.map(async (artist: Artist) => {
        const response = await api.get(`/artist/${artist.id}/top?limit=3`);
        return response.data?.data ?? [];
      }),
    );

    const allTracks = trackArray.flat();

    const uniqueTracks = allTracks.filter(
      (track, index, self) =>
        index === self.findIndex((t) => t.id === track.id),
    );
    const shuffledTracks = uniqueTracks.sort(() => Math.random() - 0.5);

    return shuffledTracks;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
};
export const getChart = async () => {
  try {
    const response = await api.get("/chart");
    return response.data.tracks.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
};
export const searchTracks = async (query: string) => {
  if (!query.trim()) return [];

  try {
    const response = await api.get("/search", {
      params: { q: query },
    });

    return response.data?.data ?? [];
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
};
