import { Dimensions, StyleSheet, Text, View } from "react-native";

import colors from "../constants/colors";
import sizes from "../constants/sizes";
import AudioVisualizer from "../components/AudioVisualizer";
import Seekbar from "../components/Seekbar";
import PlayerControls from "../components/PlayerControls";
import TrackDataInfo from "../components/TrackDataInfo";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
    },
    visualContainer: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        width: screen.width,
    },
    imageContainer: {
        height: screen.height * 0.32,
        width: screen.height * 0.32,
    },
    controlsContainer: {
        flex: 1,
        width: screen.width,
    },
    progressContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: screen.width,
    },
    trackTimeInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: screen.width,
    },
    time: {
        color: colors.subText,
        paddingHorizontal: 14,
    },
    buttonsContainers: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
});

export default function Player() {
    const isPlaying = useSelector((state: RootState) => state.playState.isPlaying);
    
    return (
        <View
            style={[styles.container, { paddingBottom: sizes.TAB_BAR_HEIGHT }]}
        >
            <View style={styles.visualContainer}>
                <AudioVisualizer shouldAnimate={isPlaying}/>
                <TrackDataInfo />
            </View>

            <View style={styles.controlsContainer}>
                <View style={styles.progressContainer}>
                    <Seekbar />
                </View>
                <PlayerControls />
            </View>
        </View>
    );
}
