import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// An Slice represents the state of a feature in the store


// This define the state's type for the slice
interface CounterState {
    value: number;
}

// Creating the initialState with the state's type and passing it to the create slice
// function automatically infers the state's type for all the reducers
const initialState: CounterState = {
    value: 0,
}

// The slice will have a name, a initial state and a bunch of reducers.
// In the reducers, because we are using the createSlice function, we can "directly" mutate the
// state. In the background redux-toolkit takes care that a new state object its created, so
// we are not really directly mutating the state, its just sintax sugar.
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
            // return {...state, value: state.value + 1}
        },
        decrement: (state) => {
            state.value -= 1;
        },
        // Add type to action
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    },
    // builder.addCase runs the callback function when the
    // asyncAction.fulfilled === true
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.pending, (state) => {
            console.log("PENDING...");
        }).addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        });
    }
});

// Add async action
// First argument: action name composed  sliceName/actionName
// Second argument: an async anonymus function
// returns values of the action's payload
export const incrementAsync = createAsyncThunk(
    "counter/incrementAsync",
    async (amount: number) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return amount;
    }
)

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;