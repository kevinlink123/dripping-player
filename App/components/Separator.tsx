import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    separator: {
        backgroundColor: 'white',
        height: StyleSheet.hairlineWidth,
        marginLeft: 20,
        width: screen.width
    },
});

export default function Separator() {
    return (
        <View style={styles.separator} />
    );
}
