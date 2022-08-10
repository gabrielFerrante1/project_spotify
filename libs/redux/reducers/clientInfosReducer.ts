import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist } from '../../types/MyPlaylist';
 
const playlists: Playlist[] = [];

export const slice = createSlice({
    name: 'clientInfos',
    initialState: {
        playlists,
        reloadPlaylists: false
    },
    reducers: {
        setInfosPlaylists: (state, action: PayloadAction<Playlist[]>) => {
            state.playlists = action.payload
        },
        setReloadPlaylists: (state, action: PayloadAction<boolean>) => {
            state.reloadPlaylists = action.payload
        }
    }
});

//Exportando ações do reducer
export const { setInfosPlaylists, setReloadPlaylists } = slice.actions;

export default slice.reducer;