import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { AudioContext } from "../utils/context/AudioProvider";
import { FontAwesome5 } from "@expo/vector-icons";

type Props = {
    shouldAnimate: boolean;
};

const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    imageContainer: {
        height: screen.height * 0.32,
        width: screen.height * 0.32,
    },
    pulsatingBox: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default function AudioVisualizer({ shouldAnimate }: Props) {
    const scaleValue = new Animated.Value(1);
    const rotateValue = new Animated.Value(0);

    useEffect(() => {
        let animation: Animated.CompositeAnimation | null = null;

        const pulsate = () => {
            animation = Animated.parallel([
                Animated.sequence([
                    Animated.timing(scaleValue, {
                        toValue: 1.2,
                        duration: 1000,
                        easing: Easing.ease,
                        useNativeDriver: false,
                    }),
                    Animated.timing(scaleValue, {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.ease,
                        useNativeDriver: false,
                    }),
                ]),
                Animated.timing(rotateValue, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
            ]);

            rotateValue.setValue(0);

            if (shouldAnimate) {
                animation.start(() => {
                    if (shouldAnimate) {
                        pulsate();
                    }
                });
            }
        };

        pulsate();

        return () => {
            // Limpiar la animación al desmontar el componente
            animation && animation.stop();
        };
    }, [shouldAnimate, scaleValue]);

    const animatedStyle = {
        transform: [
            { scale: scaleValue },
            {
                rotate: rotateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                }),
            },
        ],
    };

    return (
        <View style={styles.imageContainer}>
            <Animated.View style={[styles.pulsatingBox, animatedStyle]}>
                <FontAwesome5
                    name="compact-disc"
                    size={screen.width * 0.63}
                    color="black"
                />
            </Animated.View>
        </View>
    );
}
