import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import colors from "../constants/colors";
import { AudioContext } from "../utils/context/AudioProvider";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { togglePlayStatus, play as _play, pause as _pause } from "../store/playback/playbackSlice";

type Props = {
    togglePlayState: () => void;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonsContainers: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
});

export default function PlayerControls() {
    const dispatch = useDispatch<AppDispatch>();

    const {
        playbackObj,
        setSoundObj,
        soundObj,
        setCurrentAudioFile,
        audioFiles,
    } = useContext(AudioContext);

    const currentAudioFile = useSelector((state: RootState) => state.audioFiles.currentAudioFile);

    const play = async () => {
        if (soundObj.isLoaded && !soundObj.isPlaying) {
            const status = await playbackObj.playAsync();
            setSoundObj(status);
            dispatch(_play());
        }
    };

    const pause = async () => {
        if (soundObj.isLoaded && soundObj.isPlaying) {
            const status = await playbackObj.pauseAsync();
            setSoundObj(status);
            dispatch(_pause());
        }
    };

    const stop = async () => {
        if (soundObj.isLoaded) {
            const status = await playbackObj.unloadAsync();
            setSoundObj(status);
            dispatch(_pause());
        }
    };

    const playPreviousTrack = async () => {
        const audioFilesCount = audioFiles.length;
        if (!currentAudioFile) {
            console.log("There is no audio playing!");
            return;
        }

        const playingAudioIndex = audioFiles.indexOf(currentAudioFile);
        const prevSongIndex =
            0 === playingAudioIndex
                ? audioFilesCount - 1
                : playingAudioIndex - 1;
        setCurrentAudioFile(audioFiles[prevSongIndex]);
        console.log(prevSongIndex);
    };

    const playNextTrack = async () => {
        const audioFilesCount = audioFiles.length;
        if (!currentAudioFile) {
            console.log("There is no audio playing!");
            return;
        }

        const playingAudioIndex = audioFiles.indexOf(currentAudioFile);
        const nextSongIndex =
            audioFilesCount - 1 === playingAudioIndex
                ? 0
                : playingAudioIndex + 1;
        setCurrentAudioFile(audioFiles[nextSongIndex]);
        console.log(nextSongIndex);
    };
    return (
        <View style={styles.buttonsContainers}>
            <TouchableOpacity onPress={playPreviousTrack}>
                <Ionicons
                    name="play-back-outline"
                    size={27}
                    color={colors.subText}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={play}>
                <Feather name="play" size={28} color={colors.subText} />
            </TouchableOpacity>

            <TouchableOpacity onPress={pause}>
                <Feather name="pause" size={42} color={colors.subText} />
            </TouchableOpacity>

            <TouchableOpacity onPress={stop}>
                <Feather name="stop-circle" size={28} color={colors.subText} />
            </TouchableOpacity>

            <TouchableOpacity onPress={playNextTrack}>
                <Ionicons
                    name="play-forward-outline"
                    size={27}
                    color={colors.subText}
                />
            </TouchableOpacity>
        </View>
    );
}
