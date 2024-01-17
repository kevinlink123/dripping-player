import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface playbackState {
    isLoading: boolean;
    isPlaying: boolean;
    audioProgress: number;
}

const initialState: playbackState = {
    isLoading: true,
    isPlaying: false,
    audioProgress: 0,
}

const playbackSlice = createSlice({
    name: 'playback',
    initialState,
    reducers: {
        play: (state) => {
            state.isPlaying = true;
        },
        pause: (state) => {
            state.isPlaying = false;
        },
        togglePlayStatus: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        updateAudioProgress: (state, action: PayloadAction<number>) => {
            state.audioProgress = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
});

export const { play, pause, togglePlayStatus, updateAudioProgress, setLoading } = playbackSlice.actions;
export default playbackSlice.reducer;