import TrackPlayer, { Capability } from 'react-native-track-player';


let isSetup = false;
export const setUpPlayer = async() => {
  if (isSetup) return ;
  await TrackPlayer.setupPlayer();

  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Stop,
    ],
  });

  isSetup = true;
}