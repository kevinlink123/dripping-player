import { Audio } from "expo-av";

class PlaybackService {
    async play(playbackObj: Audio.Sound) {
        const status = await playbackObj.playAsync();
        return status;
    }

    async pause(playbackObj: Audio.Sound) {

    }

    async stop(playbackObj: Audio.Sound) {}

    async loadAudio(playbackObj: Audio.Sound, uri: string) {
        const status = await playbackObj.loadAsync(
            {
                uri,
            },
            {
                shouldPlay: true,
            }
        );

        return status;
    }

    async loadNextAudio(playbackObj: Audio.Sound, uri: string) {
        await playbackObj.unloadAsync();
        const status = await playbackObj.loadAsync(
            {
                uri
            },
            {
                shouldPlay: true,
            }
        );

        return status;
    }
}

export default new PlaybackService();
