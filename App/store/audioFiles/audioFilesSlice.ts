import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as MediaLibrary from "expo-media-library";
import PlaylistService from "../../utils/services/Playlist.service";

interface audioFilesState {
    isLoading: boolean;
    audioFiles: MediaLibrary.Asset[];
    currentAudioFile: MediaLibrary.Asset | null;
}

const initialState: audioFilesState = {
    isLoading: true,
    audioFiles: [],
    currentAudioFile: null,
}

const audioFilesSlice = createSlice({
    name: 'audioFiles',
    initialState,
    reducers: {
        setCurrentAudioFile: (state, action: PayloadAction<MediaLibrary.Asset>) => {
            state.currentAudioFile = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setAudioFiles.fulfilled, (state, action: PayloadAction<MediaLibrary.Asset[]>) => {
            state.audioFiles = [...action.payload];
            state.isLoading = false;
        });
    }
});

export const setAudioFiles = createAsyncThunk(
    'audioFiles/setAudioFilesAsync',
    async () => {
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

        return filteredAudioFiles;
    }
)

export const { setCurrentAudioFile, setLoading } = audioFilesSlice.actions;
export default audioFilesSlice.reducer;