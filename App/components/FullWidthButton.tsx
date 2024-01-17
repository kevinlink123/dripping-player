import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";

type Props = {
    text: string;
    rigthIcon: any;
    onPress?: () => void;
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: screen.width
    },
    text: {
        fontSize: 16,
        color: colors.offWhite,
    },
});

export default function FullWidthButton({ text, rigthIcon, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.row} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
            {rigthIcon}
        </TouchableOpacity>
    );
};
