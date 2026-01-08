import {
  Audio,
  AVPlaybackStatusSuccess,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";

let sound: Audio.Sound | null = null;

export const setupAudioMode = async () => {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    playsInSilentModeIOS: true,
    interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
  });
};

export const loadAndPlay = async (
  uri: string,
  onStatus: (status: AVPlaybackStatusSuccess) => void,
) => {
  if (sound) {
    await sound.unloadAsync();
    sound = null;
  }

  const { sound: newSound } = await Audio.Sound.createAsync(
    { uri },
    { shouldPlay: true },
  );

  newSound.setOnPlaybackStatusUpdate((status) => {
    if (!status.isLoaded) return;
    onStatus(status as AVPlaybackStatusSuccess);
  });

  sound = newSound;
};

export const play = async () => {
  if (sound) await sound.playAsync();
};

export const pause = async () => {
  if (sound) await sound.pauseAsync();
};

export const seekTo = async (millis: number) => {
  if (sound) await sound.setPositionAsync(millis);
};

export const stopAndUnload = async () => {
  if (!sound) return;
  await sound.stopAsync();
  await sound.unloadAsync();
  sound = null;
};
