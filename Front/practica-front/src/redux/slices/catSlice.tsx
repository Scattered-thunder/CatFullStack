import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cat } from "../../models/Cat";
import { RootState } from "../store";

export interface CatState {
    cats: Cat[];
}

const initialState: CatState = {
    cats: [],
};

const catSlice = createSlice({
    name: "cat",
    initialState,
    reducers: {
        setCats: (state, action: PayloadAction<Cat[]>) => {
            state.cats = action.payload;
        },
        addCat: (state, action: PayloadAction<Cat>) => {
            state.cats.push(action.payload);
        },
        deleteCat: (state, action: PayloadAction<number>) => {
            state.cats = state.cats.filter((cat) => cat.id !== action.payload);
        },
        updateCat: (state, action: PayloadAction<Cat>) => {
            const index = state.cats.findIndex(
                (cat) => cat.id === action.payload.id
            );
            if (index !== -1) {
                state.cats[index] = action.payload;
            }
        },
        addCats: (state, action: PayloadAction<Cat[]>) => {
            const uniqueCats = action.payload.filter(
                (uniqueCat) =>
                    !state.cats.some(
                        (existingCat) => existingCat.id == uniqueCat.id
                    )
            );
            state.cats.push(...uniqueCats);
        },
    },
});

export const { addCat, deleteCat, updateCat, addCats, setCats } = catSlice.actions;

export default catSlice.reducer;

export const selectCats = (state: RootState) => state.cat.cats;