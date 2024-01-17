import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import colors from "../constants/colors";

type Props = {
    visible: boolean;
    title: string;
    closeModal: () => void;
    playTrack: () => void;
    addToPlaylist: () => void;
};

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: colors.overlay,
    },
    modal: {
        zIndex: 1000,
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        paddingVertical: 25,
        paddingHorizontal: 6,
        backgroundColor: colors.background,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    title: {
        color: colors.offWhite,
        fontWeight: "bold",
        fontSize: 16,
        padding: 20,
        paddingBottom: 0,
    },
    buttonsContainer: {
        padding: 18,
    },
    buttonContainer: {
        paddingVertical: 10,
    },
    button: {
        color: colors.subText,
        fontWeight: "bold",
        fontSize: 15,
        letterSpacing: 1,
    },
});

export default function OptionsModal({ visible, title, closeModal, playTrack, addToPlaylist }: Props) {
    return (
        <>
            <Modal animationType="fade" transparent visible={visible}>
                <View style={styles.modal}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={playTrack}>
                            <Text style={styles.button}>Play</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer} onPress={addToPlaylist}>
                            <Text style={styles.button}>Add to playlist</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}
