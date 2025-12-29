import TrackPlayer from "react-native-track-player";

export const playTrack = async (track : any) => {
  if (!track.preview) return;

  try {
    await TrackPlayer.reset();

    await TrackPlayer.add({
      id: track.id.toString(),
      url: track.preview,
      title: track.title,
      artist: track.artist?.name,
      artwork: track.album?.cover_big,
    });
    await TrackPlayer.play();
  } catch (error) {
    console.error("Failed to play track:", error);
  }
};