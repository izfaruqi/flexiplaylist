import { nextMedia } from "./nowPlaying"
import { updateRichPresence } from './discord'
import store from "../state/store/root"
import { PLAYER_MEDIA_SET } from "../state/actions/root"

let currentTime = 0
let currentDuration = 0

export function playerHasPlayed(){
    const currentMedia = store.getState().player.media
    updateRichPresencePlay(currentMedia)
}

export function playerHasSeeked(){
    const currentMedia = store.getState().player.media
    updateRichPresencePlay(currentMedia)
}

export function playerHasPaused(){
    const currentMedia = store.getState().player.media
    updateRichPresencePaused(currentMedia)
}

export function playerHasStopped(){
    updateRichPresenceStopped()
}

export function playerHasReachedEnd(){
    nextMedia()
}

export function playerCurrentTimeUpdated(newCurrentTime){
    currentTime = newCurrentTime
}

export function playerCurrentDurationUpdated(newCurrentDuration){
    currentDuration = newCurrentDuration
}

export function removeCurrentMedia(){
    store.dispatch(PLAYER_MEDIA_SET({}))
}


export function updateRichPresencePlay(media){
    const activity = {
        details: media.custom_title || media.title,
        state: media.custom_artist || media.artist,
        largeImageKey: "play",
        largeImageText: "Playing",
        endTimestamp: Math.floor(new Date() / 1000) + media.duration - Math.round(currentTime),
        instance: false,
    }
    updateRichPresence(activity)
}

export function updateRichPresencePaused(media){
    const activity = {
        details: media.custom_title || media.title,
        state: media.custom_artist || media.artist,
        largeImageKey: "pause",
        largeImageText: "Paused",
        instance: false,
    }
    updateRichPresence(activity)
}

export function updateRichPresenceSeeked(media){
    const activity = {
        details: media.custom_title || media.title,
        state: media.custom_artist || media.artist,
        largeImageKey: "play",
        largeImageText: "Playing",
        endTimestamp: Math.floor(new Date() / 1000) + media.duration - Math.round(currentTime),
        instance: false,
    }
    updateRichPresence(activity)
}

export function updateRichPresenceStopped(){
    const activity = {
        details: "Not playing anything...",
        largeImageKey: "stop",
        largeImageText: "Stopped",
        instance: false,
    }
    updateRichPresence(activity)
}