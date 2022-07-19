import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './reducers/paginationReducer';
import playerReducer from './reducers/playerReducer';
  
  export const store = configureStore({
    reducer: {
       player: playerReducer,
       pagination: paginationReducer
    },
  });
   
  export type RootState = ReturnType<typeof store.getState>; 