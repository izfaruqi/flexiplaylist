import path from 'path'
import { addMedia } from './library'
const ipcRenderer = window.ipcRenderer

let ytdlOutput = []

export async function ytDownloadMedia(url){
    const media = await ipcRenderer.invoke('YTDL_DOWNLOAD_MEDIA', { url: url, outPath: path.join(".", "library") })
    await addMedia({
        title: media.fulltitle || media.title,
        artist: media.uploader,
        duration: media.duration,
        yt_id: media.id,
        media_url: media.media_url
    })
}