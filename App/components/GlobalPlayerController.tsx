import React, { useContext } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { AudioContext } from "../utils/context/AudioProvider";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import sizes from "../constants/sizes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { play as _play, pause as _pause } from "../store/playback/playbackSlice";

const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1000,
        position: "absolute",
        backgroundColor: colors.header,
        bottom: sizes.TAB_BAR_HEIGHT,
        right: 0,
        left: 0,
        height: screen.height * 0.07,
    },
    currentTrackInfoContainer: {
        flex: 3,
    },
    trackTitle: {
        color: colors.offWhite,
        paddingLeft: 12,
        fontWeight: "bold",
    },
    controlsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        flex: 1,
    },
});

export default function GlobalPlayerController() {
    const {
        playbackObj,
        setSoundObj,
        soundObj,
        setCurrentAudioFile,
    } = useContext(AudioContext);

    const audioFiles = useSelector((state: RootState) => state.audioFiles.audioFiles);

    const currentAudioFile = useSelector((state: RootState) => state.audioFiles.currentAudioFile);
    const dispatch = useDispatch();

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

    const playNextTrack = async () => {
        const audioFilesCount = audioFiles.length;
        if (!currentAudioFile) {
            console.log("There is no audio playing!");
            return;
        }

        const playingAudioIndex = audioFiles.indexOf(currentAudioFile);
        const nextSongIndex = audioFilesCount - 1 ===  playingAudioIndex ? 0 : playingAudioIndex + 1;
        setCurrentAudioFile(audioFiles[nextSongIndex])
        console.log(nextSongIndex);
    };

    return (
        <>
            {soundObj.isLoaded ? (
                <View style={styles.container}>
                    <View style={styles.currentTrackInfoContainer}>
                        <Text numberOfLines={2} style={styles.trackTitle}>
                            {currentAudioFile?.filename}
                        </Text>
                    </View>
                    {soundObj.isPlaying ? (
                        <TouchableOpacity onPress={pause}>
                            <Feather
                                name="pause"
                                size={24}
                                color={colors.subText}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={play}>
                            <Feather
                                name="play"
                                size={24}
                                color={colors.subText}
                            />
                        </TouchableOpacity>
                    )}

                    <View style={styles.controlsContainer}>
                        <TouchableOpacity onPress={playNextTrack}>
                            <Ionicons
                                name="play-forward-outline"
                                size={27}
                                color={colors.subText}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : null}
        </>
    );
}
