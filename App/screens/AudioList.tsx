import React, { useContext, useState } from "react";
import {
    FlatList,
    StyleSheet,
} from "react-native";
import { AudioContext } from "../utils/context/AudioProvider";
import FileRowItem from "../components/FileRowItem";
import colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import OptionsModal from "../components/OptionsModal";

import * as MediaLibrary from "expo-media-library";
import PlaybackService from "../utils/services/Playback.service";
import sizes from "../constants/sizes";
import EmptyAudioList from "./EmptyAudioList";
import LoadingOverlay from "../components/LoadingOverlay";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { play } from "../store/playback/playbackSlice";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
    },
});

export default function AudioList() {
    const {
        audioFiles,
        playbackObj,
        soundObj,
        setCurrentAudioFile,
        setSoundObj,
    } = useContext(AudioContext);

    const isLoading = useSelector((state: RootState) => state.playState.isLoading);

    const dispatch = useDispatch<AppDispatch>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTitle, setCurrentTitle] = useState("");

    const loadCurrentTrack = async (audio: MediaLibrary.Asset) => {
        // TODO: Refactor all this code and split every pricipal
        // function (play, pause, next, previus)

        // Play if playback is loaded and no other file is playing
        if (!soundObj.isLoaded) {
            const status = await PlaybackService.loadAudio(
                playbackObj,
                audio.uri
            );
            setCurrentAudioFile(audio);
            setSoundObj(status);
            dispatch(play());
            return;
        }

        if (soundObj.isLoaded) {
            const status = await PlaybackService.loadNextAudio(
                playbackObj,
                audio.uri
            );
            setCurrentAudioFile(audio);
            setSoundObj(status);
            dispatch(play());
            return;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading && <LoadingOverlay />}
            <StatusBar style="light" />
            {!audioFiles.length ? (
                <EmptyAudioList />
            ) : (
                <FlatList
                    style={{
                        marginBottom: soundObj.isLoaded
                            ? sizes.TAB_BAR_HEIGHT
                            : 0,
                    }}
                    data={audioFiles}
                    renderItem={({ item }) => {
                        return (
                            <FileRowItem
                                text={item.filename}
                                duration={item.duration}
                                onPressOptions={() => {
                                    setIsModalOpen(true);
                                    setCurrentTitle(item.filename);
                                }}
                                onAudioPress={() => {
                                    loadCurrentTrack(item);
                                }}
                            />
                        );
                    }}
                />
            )}
            <OptionsModal
                visible={isModalOpen}
                title={currentTitle}
                closeModal={() => setIsModalOpen(false)}
                playTrack={() => console.log("Playing track...")}
                addToPlaylist={() => console.log("Track added to playlist")}
            />
        </SafeAreaView>
    );
}
