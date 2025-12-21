import { useEffect } from "react";
import { getGenre, getTracksByGenre } from "../services/musicService";
import useMusicStore, { Genre } from "../store/useMusicStore";

const usePopularMusic = () => {
  const { setgenreTracks, setLoading, loading, genreTracks } = useMusicStore();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const genres: Genre[] = await getGenre();
      const genrePopularTracks = await Promise.all(
        genres.map(async (genre) => {
          const tracks = await getTracksByGenre(genre.id);
          return { id: genre.id, name: genre.name, tracks };
        }),
      );

      setgenreTracks(genrePopularTracks);
      setLoading(false);
    };
    load();
  }, []);
  return { loading, genreTracks };
};
export default usePopularMusic;
