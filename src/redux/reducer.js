import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    client: { toggleForm: false, updateId: "", deleteId: "", deleteToggle: false }
}
export const ReducerSlice = createSlice({
    name: "NEXT-CRUD-APP",
    initialState,
    reducers: {
        toggleChangeAction: (state) => {
            state.client.toggleForm = !state.client.toggleForm;
        },
        addUpdateIdAction: (state, action) => {
            state.client.updateId = action.payload;
        },
        DeleteIdAction: (state, action) => {
            state.client.deleteId = action.payload;
        },
        DeleteToggleAction: (state, action) => {
            state.client.deleteToggle = action.payload;
        }
    }
})


export const { toggleChangeAction, addUpdateIdAction, DeleteIdAction, DeleteToggleAction } = ReducerSlice.actions;
export default ReducerSlice.reducer;