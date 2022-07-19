import {createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { InfoTrack } from '../../types/InfoTrack';
import type { Playlist } from '../../types/Playlist';


const playlist: Playlist[] = [
    {id:1, name: '', path: '', avatar: '', author: ''},
];

const dataPlaying: InfoTrack= {
    id: 0,
    tipo: '' 
}

export const slice = createSlice({
    name: 'player',
    initialState: {
        srcAudio: '',
        playlist: playlist,
        isPlaying: -1,
        isPlayingData: dataPlaying,
        viewPlaylist: false,
        resetAudioOnAlterationPlaylist: true
    },
    reducers: {
        setSrcAudio: (state, action) => {
            state.srcAudio = action.payload
        },
        setPlayList: (state, action: PayloadAction<Playlist[]>) => {
            state.playlist = action.payload; 
        },
        setIsPlayingTrack: (state, action: PayloadAction<number>) => {
            state.isPlaying = action.payload;
        },
        setIsPlayingData: (state, action: PayloadAction<InfoTrack>) => {
            state.isPlayingData = action.payload;
        },
        setViewPlaylist: (state, action: PayloadAction<boolean>) => {
            state.viewPlaylist = action.payload;
        },
        setResetAudioOnAlterationPlaylist: (state, action: PayloadAction<boolean>) => {
            state.resetAudioOnAlterationPlaylist = action.payload;
        }
    }
});

//Exportando ações do reducer
export const {setSrcAudio, setPlayList, setIsPlayingTrack, setIsPlayingData, setViewPlaylist, setResetAudioOnAlterationPlaylist} = slice.actions;

export default slice.reducer;