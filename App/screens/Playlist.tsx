import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background
    },
});

export default function Playlist() {
    return (
        <View style={styles.container}>
            <Text style={{ color: colors.offWhite }}>COMING SOON...</Text>
        </View>
    );
}
