import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import FullWidthButton from "../components/FullWidthButton";
import Separator from "../components/Separator";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../constants/colors";
import PlaylistService from "../utils/services/Playlist.service";
import DocumentPicker from 'react-native-document-picker';
import { AudioContext } from "../utils/context/AudioProvider";
import charParse from "../constants/charParse";

import { setAudioFiles } from "../store/audioFiles/audioFilesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

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
        backgroundColor: colors.background,
    },
    icon: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
});


export default function Options() {
    const dispatch = useDispatch<AppDispatch>();

    const addFolder = async () => {
        try {
            const result = await DocumentPicker.pickDirectory();
            const parsedUri = parseUri(result!.uri);
            await PlaylistService.saveNewMusicDirectory(parsedUri);
    
            dispatch(setAudioFiles());
        } catch (e: any) {
            console.log(e);
        }
    };

    const createNewPlaylist = async () => {
        alert("COMING SOON...");
    }

    return (
        <View style={styles.container}>
            <FullWidthButton
                text="Create new playlist"
                rigthIcon={
                    <View style={styles.icon}>
                        <MaterialIcons
                            name="playlist-add"
                            size={28}
                            color={colors.subText}
                        />
                    </View>
                }
                onPress={createNewPlaylist}
            />
            <Separator />

            <FullWidthButton
                text="Add folder to search music"
                rigthIcon={
                    <View style={styles.icon}>
                        <FontAwesome5
                            name="folder-plus"
                            size={22}
                            color={colors.subText}
                        />
                    </View>
                }
                onPress={addFolder}
            />
            <Separator />
        </View>
    );
}
