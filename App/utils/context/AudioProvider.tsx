import { Alert, Text, View } from "react-native";
import React, { Component, createContext } from "react";

import * as MediaLibrary from "expo-media-library";
import {
    Audio,
    AVPlaybackStatus,
    AVPlaybackStatusSuccess,
    InterruptionModeAndroid,
} from "expo-av";
import PlaylistService from "../services/Playlist.service";
import * as Notifications from "expo-notifications";
import { connect } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setLoading, updateAudioProgress } from "../../store/playback/playbackSlice";
import { setCurrentAudioFile } from "../../store/audioFiles/audioFilesSlice";

type AudioProviderProps = {
    children: any;
    dispatch: AppDispatch;
};

type AudioProviderState = {
    playbackObj: Audio.Sound;
    soundObj: AVPlaybackStatus | AVPlaybackStatusSuccess;
    audioFiles: MediaLibrary.Asset[];
    permissionError: boolean;
};

type AudioContextType = {
    playbackObj: Audio.Sound;
    soundObj: AVPlaybackStatus | AVPlaybackStatusSuccess;
    audioFiles: MediaLibrary.Asset[];
    setCurrentAudioFile: (audio: MediaLibrary.Asset) => void;
    setSoundObj: (status: AVPlaybackStatus | AVPlaybackStatusSuccess) => void;
    setAudioFiles: () => void;
};

export const AudioContext = createContext<AudioContextType>(
    {} as AudioContextType
);
class AudioProviderClass extends Component<
    AudioProviderProps,
    AudioProviderState
> {
    constructor(props: AudioProviderProps) {
        super(props);
        this.state = {
            audioFiles: [],
            permissionError: false,
            playbackObj: new Audio.Sound(),
            soundObj: {} as AVPlaybackStatus,
        };
    }

    permissionAlert = async () => {
        Alert.alert(
            "Permissions Request",
            "This app needs access to read audio files from your device!",
            [
                {
                    text: "Ready to drip!",
                    onPress: () => {
                        this.getPermission();
                    },
                },
                {
                    text: "Cancel",
                    onPress: () => {
                        this.permissionAlert();
                    },
                },
            ]
        );
    };

    setAudioFiles = async () => {
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: "audio",
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType: "audio",
            first: media.assets.length,
        });

        const musicFolders: string[] = await PlaylistService.getMusicFolders();

        const filteredAudioFiles = media.assets.filter((asset) => {
            // return asset.uri.includes("Musica")
            return musicFolders.some((folder) => asset.uri.includes(folder));
        });

        this.setState({
            ...this.state,
            audioFiles: filteredAudioFiles,
        });

        this.props.dispatch(setLoading(false));
    };

    getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync();

        if (permission.granted) {
            // Get all the audio files
            this.setAudioFiles();
        }

        if (!permission.canAskAgain && !permission.granted) {
            this.setState({ ...this.state, permissionError: true });
        }

        if (!permission.granted && permission.canAskAgain) {
            // Request permissions
            const { status, canAskAgain } =
                await MediaLibrary.requestPermissionsAsync();

            if (status === "denied" && canAskAgain) {
                // Display alert requesting media permissions
                this.permissionAlert();
            }

            if (status === "granted") {
                // Get all the audio files after permission are being granted from the user
                this.setAudioFiles();
            }

            if (status === "denied" && !canAskAgain) {
                // Display error to the user
                this.setState({ ...this.state, permissionError: true });
            }
        }
    };

    requestNotificationPermission = async () => {
        const { status } = await Notifications.getPermissionsAsync();

        if (status !== "granted") {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            if (newStatus === "granted") {
                // Permiso concedido
                console.log("Permiso de notificación concedido");
            } else {
                // Permiso no concedido
                console.log("Permiso de notificación no concedido");
            }
        }
    };

    playbackStatusListener = (playbackStatus: AVPlaybackStatus) => {
        const audioProgress = playbackStatus.isLoaded ? playbackStatus.positionMillis / playbackStatus.durationMillis! : 0
        // this.setState({audioProgress: audioProgress});
        this.props.dispatch(updateAudioProgress(audioProgress));
    }

    createPlaybackObj = async () => {
        await Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        });
        const status = await this.state.playbackObj.getStatusAsync();
        this.state.playbackObj.setOnPlaybackStatusUpdate(this.playbackStatusListener);
        this.setState({ ...this.state, soundObj: status });
    };

    setCurrentAudioFile = async (audio: MediaLibrary.Asset) => {
        await this.state.playbackObj.unloadAsync();
        const status = await this.state.playbackObj.loadAsync(
            {
                uri: audio.uri,
            },
            {
                shouldPlay: true,
            }
        );
        this.setState({
            ...this.state,
            soundObj: status,
        });

        this.props.dispatch(setCurrentAudioFile(audio));
    };

    setSoundObj = async (
        status: AVPlaybackStatus | AVPlaybackStatusSuccess
    ) => {
        const newStatus = status.isLoaded
            ? (status as AVPlaybackStatusSuccess)
            : (status as AVPlaybackStatus);
        this.setState({ ...this.state, soundObj: newStatus });

        // this.isPlaying = newStatus.isLoaded && newStatus.isPlaying ? true : false;
    };

    componentDidMount(): void {
        this.requestNotificationPermission();
        this.getPermission();
        if (this.state.permissionError) {
            return;
        }

        this.createPlaybackObj();
        this.requestNotificationPermission();
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error(error)
    }

    render() {
        if (this.state.permissionError)
            return (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "red",
                            fontSize: 24,
                            textAlign: "center",
                        }}
                    >
                        It looks like you haven't give the app the proper
                        permissions!
                    </Text>
                </View>
            );
        return (
            <AudioContext.Provider
                value={{
                    audioFiles: this.state.audioFiles,
                    playbackObj: this.state.playbackObj,
                    soundObj: this.state.soundObj,
                    setCurrentAudioFile: this.setCurrentAudioFile,
                    setSoundObj: this.setSoundObj,
                    setAudioFiles: this.setAudioFiles,
                }}
            >
                {this.props.children}
            </AudioContext.Provider>
        );
    }
}

export const AudioProvider = connect()(AudioProviderClass);
