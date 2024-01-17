import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter/counterSlice';
import playbackReducer from './playback/playbackSlice';
import audioFilesReducer from './audioFiles/audioFilesSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        playState: playbackReducer,
        audioFiles: audioFilesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;