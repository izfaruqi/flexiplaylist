export function LIBRARY_MEDIA_ADD(payload){
    return { type: "LIBRARY_MEDIA_ADD", payload: payload }
}

export function LIBRARY_MEDIA_LOAD(payload){
    return { type: "LIBRARY_MEDIA_LOAD", payload: payload }
}

export function PLAYER_MEDIA_SET(payload){
    return { type: "PLAYER_MEDIA_SET", payload: payload }
}

export function PLAYER_VOLUME_SET(payload){
    return { type: "PLAYER_VOLUME_SET", payload: payload }
}

export function PLAYER_PAUSED_SET(payload){
    return { type: "PLAYER_PAUSED_SET", payload: payload }
}

export function NOWPLAYING_ADD(payload){
    return { type: "NOWPLAYING_ADD", payload: payload }
}

export function NOWPLAYING_EJECT(payload){
    return { type: "NOWPLAYING_EJECT", payload: payload }
}

export function NOWPLAYING_INDEX_SET(payload){
    return { type: "NOWPLAYING_INDEX_SET", payload: payload }
}

export function NOWPLAYING_REPEAT_SET(payload){
    return { type: "NOWPLAYING_REPEAT_SET", payload: payload }
}

export function NOWPLAYING_LIST_SET(payload){
    return { type: "NOWPLAYING_LIST_SET", payload: payload }
}