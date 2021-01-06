import { produce } from 'immer'

const initialState = {
    library: [

    ],
    nowPlaying: {
        list: [],
        repeat: true,
        currentIndex: 0
    },
    player: {
        media: {},
        volume: 0.1,
        isPaused: 0,
    }
}

export default function rootReducer(state = initialState, action) {
    switch(action.type){
        case "LIBRARY_MEDIA_ADD":
            return produce(state, draft => {
                draft.library.push(action.payload)
            })
        case "LIBRARY_MEDIA_LOAD":
            return produce(state, draft => {
                draft.library = action.payload
            })
        case "PLAYER_MEDIA_SET":
            return produce(state, draft => {
                draft.player.media = action.payload
                draft.player.isPaused = false
            })
        case "PLAYER_VOLUME_SET":
            return produce(state, draft => {
                draft.player.volume = action.payload
            })
        case "PLAYER_PAUSED_SET":
            return produce(state, draft => {
                draft.player.isPaused = action.payload
            })
        case "NOWPLAYING_ADD":
            return produce(state, draft => {
                draft.nowPlaying.list.push(action.payload)
            })
        case "NOWPLAYING_EJECT":
            console.log("ejecting " + action.payload)
            return produce(state, draft => {
                draft.nowPlaying.list = draft.nowPlaying.list.filter(x => x.id != action.payload)
            })
        case "NOWPLAYING_INDEX_SET":
            console.log("NOWPLAYING_INDEX_SET: " + action.payload)
            return produce(state, draft => {
                draft.nowPlaying.currentIndex = action.payload
            }) 
        case "NOWPLAYING_REPEAT_SET":
            return produce(state, draft => {
                draft.nowPlaying.repeat = action.payload
            })
        case "NOWPLAYING_LIST_SET":
            return produce(state, draft => {
                draft.nowPlaying.list = action.payload
            })
        default:
            return state
    }
}