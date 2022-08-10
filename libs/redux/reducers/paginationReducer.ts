import {createSlice, PayloadAction } from '@reduxjs/toolkit';

const page: number = 1;

export const slice = createSlice({
    name: 'pagination',
    initialState: {
        page
    },
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        } 
    }
});

//Exportando ações do reducer
export const {setPage} = slice.actions;

export default slice.reducer;