const { ipcMain } = require('electron')
const { promisify } = require('util')
const path = require('path')
const fs = require('fs')

const unlinkFile = promisify(fs.unlink)

function init(){
    ipcMain.handle("LIBRARY_MEDIA_DELETE", async (e, { media }) => {
        const parsed = path.parse(media.media_url)
        const jsonPath = parsed.name + ".info.json"

        await unlinkFile(media.media_url)
        await unlinkFile(path.join(parsed.dir, jsonPath))
        console.log("Deleted " + media.media_url)
        return true
    })

    
}

module.exports = {
    init
}