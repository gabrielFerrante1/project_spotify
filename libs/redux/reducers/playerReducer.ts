import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { InfoTrack } from '../../types/InfoTrack';
import type { Music } from '../../types/Music';


const playlist: Music[] = [];

const dataPlaying: InfoTrack = {
    id: 0,
    tipo: ''
}

export const slice = createSlice({
    name: 'player',
    initialState: {
        srcAudio: '',
        playlist: playlist,
        isPlayingMusic: -1,
        isPlayingData: dataPlaying,
        viewPlaylist: false,
        resetAudioOnAlterationPlaylist: true,
        pause: false 
    },
    reducers: {
        setSrcAudio: (state, action) => {
            state.srcAudio = action.payload
        },
        setPlayList: (state, action: PayloadAction<Music[]>) => {
            state.playlist = action.payload;
        },
        setIsPlayingMusic: (state, action: PayloadAction<number>) => {
            state.isPlayingMusic = action.payload;
        },
        setIsPlayingData: (state, action: PayloadAction<InfoTrack>) => {
            state.isPlayingData = action.payload;
        },
        setViewPlaylist: (state, action: PayloadAction<boolean>) => {
            state.viewPlaylist = action.payload;
        },
        setResetAudioOnAlterationPlaylist: (state, action: PayloadAction<boolean>) => {
            state.resetAudioOnAlterationPlaylist = action.payload;
        },
        setPause: (state, action: PayloadAction<boolean>) => {
            state.pause = action.payload;
        }  
    }
});

//Exportando ações do reducer
export const {
    setSrcAudio, setPlayList, setIsPlayingMusic,
    setIsPlayingData, setViewPlaylist, setResetAudioOnAlterationPlaylist,
    setPause
} = slice.actions;

export default slice.reducer;