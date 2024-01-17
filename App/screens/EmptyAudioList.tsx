import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DocumentPicker, { DirectoryPickerResponse } from 'react-native-document-picker';
import colors from "../constants/colors";
import charParse from "../constants/charParse";
import PlaylistService from "../utils/services/Playlist.service";
import { AudioContext } from "../utils/context/AudioProvider";

const parseUri = (uri: string) => {
    const folderStartIndex = uri.indexOf("%3A") + 3;
    const folderLocation = uri.slice(folderStartIndex);

    const parsedUri = folderLocation.replaceAll(charParse.SLASH, '/').replaceAll(charParse.SPACE, ' ');

    return parsedUri;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    message: {
        margin: 10,
        color: colors.offWhite,
        textAlign: 'center',
        fontSize: 18,
        letterSpacing: 2
    },
    buttonContainer: {
        backgroundColor: colors.tabBarBackground,
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 30,
    },
    button: {
        color: colors.offWhite,
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default function EmptyAudioList() {

    const { setAudioFiles } = useContext(AudioContext);

    const pickFolder = async () => {
        try {
            const result = await DocumentPicker.pickDirectory();
            const parsedUri = parseUri(result!.uri);
            await PlaylistService.saveNewMusicDirectory(parsedUri);
            
            setAudioFiles();
        } catch(e: any) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.message}>
                Here will appear all the audio files from the folders that you
                specify
            </Text>
            <TouchableOpacity onPress={pickFolder} style={styles.buttonContainer}>
                <Text style={styles.button}>Add Folders to Scan!</Text>
            </TouchableOpacity>
        </View>
    );
}
