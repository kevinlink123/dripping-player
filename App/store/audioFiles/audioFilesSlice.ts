import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as MediaLibrary from "expo-media-library";

interface audioFilesState {
    audioFiles: MediaLibrary.Asset[];
    currentAudioFile: MediaLibrary.Asset | null;
}

const initialState: audioFilesState = {
    audioFiles: [],
    currentAudioFile: null,
}

const audioFilesSlice = createSlice({
    name: 'audioFiles',
    initialState,
    reducers: {
        setAudioFiles: (state, action: PayloadAction<MediaLibrary.Asset[]>) => {
            state.audioFiles = [...action.payload];
        },
        setCurrentAudioFile: (state, action: PayloadAction<MediaLibrary.Asset>) => {
            state.currentAudioFile = action.payload;
        }
    }
});

export const { setAudioFiles, setCurrentAudioFile } = audioFilesSlice.actions;
export default audioFilesSlice.reducer;