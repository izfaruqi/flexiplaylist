const { ipcMain } = require('electron')
const path = require('path')
const { promisify } = require('util')
const fs = require('fs')
const { spawn } = require('child_process')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const renameFile = promisify(fs.rename)
const unlinkFile = promisify(fs.unlink)
const rmDir = promisify(fs.rmdir)
const mkDir = promisify(fs.mkdir)
const readDir = promisify(fs.readdir)

const YTDL_PATH = path.join(__dirname, "..", "bin", "youtube-dl.exe")
const YTDL_DL_TEMP_FOLDER = ".fp_tmp"
const YTDL_SAVE_INFO_JSON = false

async function init(win){
    console.log("Start init youtube-dl.")
    ipcMain.handle("YTDL_DOWNLOAD_MEDIA", async (e, { url, outPath }) => {
        console.log("Starting download " + url)
        console.log('-o "' + path.join(outPath, "%(title)s.%(id)s.%(ext)s") + '"')

        try {
            await mkDir(path.join(outPath, YTDL_DL_TEMP_FOLDER))
        } catch (e) {}

        const ytdlProcess = spawn(YTDL_PATH, ['"' + url + '"', '--write-info-json', '--no-playlist', '-f bestaudio', '-o "' + path.join(outPath, YTDL_DL_TEMP_FOLDER, "%(title)s.%(id)s.%(ext)s") + '"'], { shell: true})
        ytdlProcess.stdout.on('data', (data) => {
            console.log(data.toString())
            win.webContents.send('YTDL_OUTPUT', data.toString())
        })
        ytdlProcess.stderr.on('data', (data) => {
            console.log(data.toString())
            win.webContents.send('YTDL_OUTPUT', data.toString())
        })

        await new Promise((res, rej) => {
            ytdlProcess.on('exit', () => {
                res()
            })
        })

        let tmpFileList = await readDir(path.join(outPath, YTDL_DL_TEMP_FOLDER))
        let mediaName = tmpFileList.filter(x => !x.endsWith(".json"))[0]
        let jsonName = tmpFileList.filter(x => x.endsWith(".json"))[0]

        await renameFile(path.join(outPath, YTDL_DL_TEMP_FOLDER, mediaName), path.join(outPath, mediaName))

        // Truncate large unneeded data
        let mediaJson = JSON.parse(await readFile(path.join(outPath, YTDL_DL_TEMP_FOLDER, jsonName)))
        mediaJson.formats = null
        mediaJson.thumbnails = null
        mediaJson.http_headers = null
        mediaJson.url = null
        mediaJson.player_url = null
        mediaJson._filename = null
        mediaJson.media_url = path.join(outPath, mediaName)

        if(YTDL_SAVE_INFO_JSON){
            await writeFile(path.join(outPath, jsonName), JSON.stringify(mediaJson))
        }

        await unlinkFile(path.join(outPath, YTDL_DL_TEMP_FOLDER, jsonName))
        await rmDir(path.join(outPath, YTDL_DL_TEMP_FOLDER))
        return mediaJson
    })

    
}

module.exports = {
    init
}