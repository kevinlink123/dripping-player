import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface playbackState {
    isPlaying: boolean;
    audioProgress: number;
}

const initialState: playbackState = {
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
        }
    }
});

export const { play, pause, togglePlayStatus, updateAudioProgress } = playbackSlice.actions;
export default playbackSlice.reducer;