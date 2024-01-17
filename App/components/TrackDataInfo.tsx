import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import { AudioContext } from "../utils/context/AudioProvider";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const styles = StyleSheet.create({
    trackDataContainer: {
        marginTop: 10,
    },
    trackTitle: {
        textAlign: "center",
        letterSpacing: 2,
        fontWeight: "bold",
        color: colors.subText,
    },
    trackLocation: {
        textAlign: "center",
        letterSpacing: 1,
        fontSize: 10,
        color: colors.offWhite,
    },
});

export default function TrackDataInfo() {
    const currentAudioFile = useSelector((state: RootState) => state.audioFiles.currentAudioFile);

    return (
        <View style={styles.trackDataContainer}>
            <Text style={styles.trackTitle}>
                {currentAudioFile
                    ? currentAudioFile.filename
                    : "Eliga una canción"}
            </Text>
            <Text style={styles.trackLocation}>
                {currentAudioFile && currentAudioFile.uri}
            </Text>
        </View>
    );
}
