import { LIBRARY_MEDIA_ADD, LIBRARY_MEDIA_LOAD } from '../state/actions/root'
import store from '../state/store/root'
const ipcRenderer = window.ipcRenderer

export async function addMedia(media){
    const id = (await ipcRenderer.invoke('DB_LIBRARY_ADD', { media: media })).lastID
    store.dispatch(LIBRARY_MEDIA_ADD({
        id: id,
        ...media
    }))
}

export async function deleteMedia(media){
    console.log(media)
    ipcRenderer.invoke('DB_LIBRARY_DELETE', { mediaId: media.id })
    ipcRenderer.invoke('LIBRARY_MEDIA_DELETE', { media: media })
    loadAllMediaFromDB()
}

export function modifyCustomNamesMedia(mediaId, customNames){
    ipcRenderer.invoke('DB_LIBRARY_MODIFY_CUSTOM_NAMES', { mediaId: mediaId, customNames: customNames })
}

export async function loadAllMediaFromDB(){
    const medias = await ipcRenderer.invoke('DB_LIBRARY_GET_ALL')
    store.dispatch(LIBRARY_MEDIA_LOAD(medias))
}