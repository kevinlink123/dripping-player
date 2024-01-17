import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import colors from "../constants/colors";

type Props = {
    text: string;
    duration: number;
    onPressOptions: () => void;
    onAudioPress: () => void;
};

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 12,
        width: screen.width,
    },
    songInfoContainer: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        flexShrink: 1,
        flexGrow: 1,

    },
    title: {
        fontWeight: "bold",
        color: colors.text
    },
    subTitle: {
        color: colors.subText
    },
    actionsContainer: {
        paddingVertical: 16,
        paddingHorizontal: 16,
    }
});

const formatDuration = (duration: number) => {
    const minutes = String(duration/60).split('.')[0];
    const secondsRemainder = (parseFloat(`0.${String(duration/60).split('.')[1]}`) * 60).toFixed();

    const formatedTime = parseInt(secondsRemainder) < 10 ? `${minutes}:0${secondsRemainder}` : `${minutes}:${secondsRemainder}`;
    return formatedTime;
}

export default function FileRowItem({ text, duration, onPressOptions, onAudioPress }: Props) {
    return (
        <View style={styles.container}>
            <MaterialIcons name="album" size={36} color={colors.albumIcon} />
            <TouchableOpacity style={styles.songInfoContainer} onPress={onAudioPress}>
                <Text style={styles.title}>{text}</Text>
                <Text style={styles.subTitle} numberOfLines={2} >{formatDuration(duration)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionsContainer} onPress={onPressOptions}>
                <SimpleLineIcons name="options-vertical" size={24} color="gray" />
            </TouchableOpacity>
        </View>
    );
}
