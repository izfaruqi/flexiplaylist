import { NOWPLAYING_ADD, NOWPLAYING_EJECT, NOWPLAYING_INDEX_SET, NOWPLAYING_LIST_SET, PLAYER_MEDIA_SET } from '../state/actions/root'
import store from '../state/store/root'
import { removeCurrentMedia as playerRemoveCurrentMedia } from './player'

export function addMedia(media){
    const mediaWithNpId = { np_id: window.crypto.getRandomValues(new Uint32Array(1))[0], ...media }
    store.dispatch(NOWPLAYING_ADD(mediaWithNpId))
    if(store.getState().nowPlaying.list.length == 1){
        store.dispatch(PLAYER_MEDIA_SET(mediaWithNpId))
    }
    console.log(store.getState().nowPlaying)
}

export function nextMedia(){
    const stateNowPlaying = store.getState().nowPlaying
    let nextIndex = 0
    if(stateNowPlaying.currentIndex + 1 < stateNowPlaying.list.length){
        nextIndex = stateNowPlaying.currentIndex + 1
    }
    store.dispatch(NOWPLAYING_INDEX_SET(nextIndex))
    playerRemoveCurrentMedia()
    if(!(nextIndex == 0 && !stateNowPlaying.repeat)){
        store.dispatch(PLAYER_MEDIA_SET(stateNowPlaying.list[nextIndex]))
    }
}

export function playNpId(np_id){
    console.log(np_id)
    const index = store.getState().nowPlaying.list.findIndex(x => x.np_id == np_id)
    console.log(index)

    store.dispatch(NOWPLAYING_INDEX_SET(index))
    playerRemoveCurrentMedia()
    store.dispatch(PLAYER_MEDIA_SET(store.getState().nowPlaying.list[index]))
}

export function removeMedia(np_id){
    const oldNpList = Array.from(store.getState().nowPlaying.list)
    oldNpList.splice(oldNpList.findIndex(x => x.np_id == np_id), 1)
    store.dispatch(NOWPLAYING_LIST_SET(oldNpList))
    if(store.getState().player.media.np_id == np_id){
        if(store.getState().nowPlaying.list.length == 0){
            playerRemoveCurrentMedia()
            return
        }
        store.dispatch(NOWPLAYING_INDEX_SET(store.getState().nowPlaying.currentIndex - 1))
        nextMedia()
        console.log("NP")
    } else {
        store.dispatch(NOWPLAYING_INDEX_SET(oldNpList.findIndex(x => x.np_id == store.getState().player.media.np_id)))
    }
}