import Slider from "@react-native-community/slider";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import { AudioContext } from "../utils/context/AudioProvider";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    trackTimeInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: screen.width
    },
    time: {
        color: colors.subText,
        paddingHorizontal: 14
    },
});

export default function Seekbar() {
    const audioProgress = useSelector((state: RootState) => state.playState.audioProgress);
    
    return (
        <>
            <View style={styles.trackTimeInfo}>
                <Text style={styles.time}>00:00</Text>
                <Text style={styles.time}>03:44</Text>
            </View>
            <Slider
                style={{ width: screen.width, height: 30 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={audioProgress}
            />
        </>
    );
}
