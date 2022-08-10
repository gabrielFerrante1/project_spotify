import { configureStore } from '@reduxjs/toolkit';
import clientInfosReducer  from './reducers/clientInfosReducer';
import paginationReducer from './reducers/paginationReducer';
import playerReducer from './reducers/playerReducer';

export const store = configureStore({
    reducer: {
        player: playerReducer,
        pagination: paginationReducer,
        clientInfos: clientInfosReducer
    },
});

export type RootState = ReturnType<typeof store.getState>; 