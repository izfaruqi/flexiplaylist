import { useState, useRef } from 'react'
import { ytDownloadMedia } from '../../controllers/youtube'

import Button from '../Base/Button'

import Modal from '../Base/Modal'
const ipcRenderer = window.ipcRenderer

export default function AddFromYoutubeModal({ isOpen, onClose }){
    const [url, setUrl] = useState("")
    const logger = useRef()
    const [isDownloading, setIsDownloading] = useState(false)

    const onNewLog = (e, args) => {
        logger.current.innerHTML += (args + "\n")
        logger.current.scrollTop = logger.current.scrollHeight
    }

    const clearLog = () => {
        logger.current.style.display = "none"
        logger.current.innerHTML = ""
    }

    const download = async (url) => {
        logger.current.style.display = ""
        setIsDownloading(true)
        ipcRenderer.on('YTDL_OUTPUT', onNewLog)
        await ytDownloadMedia(url)
        ipcRenderer.removeListener('YTDL_OUTPUT', onNewLog)
        setUrl("")
        setIsDownloading(false)
    }

    const _onClose = () => {
        clearLog()
        setUrl("")
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={_onClose}>
            <h4 className="mb-4">Add from Youtube</h4>
            <div className="flex flex-col flex-content-start h-full">
                <input disabled={isDownloading} className="bg-black font-mono border border-white p-1 px-2 w-full focus:outline-none" placeholder="Insert Youtube video URL here..." onChange={(e) => setUrl(e.target.value)} value={url}></input>
                <pre ref={logger} className="bg-black font-mono border max-h-48 overflow-auto border-white mt-2 px-2 py-1 text-xs" style={{whiteSpace: "pre-wrap", display: "none"}}></pre>
                <div className="flex flex-row-reverse mt-2"><Button onClick={() => download(url)}>Download and add</Button></div>
            </div>
        </Modal>
    )
}