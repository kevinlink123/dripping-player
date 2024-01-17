import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    title: string;
    backgroundColor: string;
};

const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "flex-end",
        height: screen.height * 0.1,
    },
    title: {
        fontSize: 18,
        color: colors.text,
    },
});

export default function Header({ title, backgroundColor }: Props) {
    return (
        <LinearGradient
            colors={[colors.header, colors.background]}
            start={{ x: 0.5, y: 0.2 }}
            style={styles.container}
        >
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
        </LinearGradient>
    );
}
