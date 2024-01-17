import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
    container: {
        zIndex: 1000,
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: colors.overlay,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default function LoadingOverlay() {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={colors.offWhite} size={38} />
        </View>
    );
}
