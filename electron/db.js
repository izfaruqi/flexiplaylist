const path = require('path')
const fs = require('fs')
const util = require("util")
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const { ipcMain } = require('electron')

const fsAccess = util.promisify(fs.access)
const fsCopyFile = util.promisify(fs.copyFile)
async function init(){

    try {
        await fsAccess(path.join(__dirname, "..", "db.sqlite3"), fs.F_OK)
    } catch (e) {
        await fsCopyFile(path.join(__dirname, "..", "db.sqlite3.template"), path.join(__dirname, "..", "db.sqlite3"))
    }

    const db = await open({
        filename: path.join(__dirname, "..", "db.sqlite3"),
        driver: sqlite3.cached.Database
    })

    ipcMain.handle("DB_LIBRARY_ADD", async (e, { media }) => {
        const result = await db.run('INSERT INTO library (id, title, artist, yt_id, duration, media_url) VALUES (null, ?, ?, ?, ?, ?)', [
            media.title, media.artist, media.yt_id, media.duration, media.media_url
        ])
        return result
    })

    ipcMain.handle("DB_LIBRARY_DELETE", async (e, { mediaId }) => {
        const result = await db.run("DELETE FROM library WHERE id = ?", [mediaId])
        return result
    })

    ipcMain.handle("DB_LIBRARY_GET_ALL", async (e, args) => {
        const result = await db.all('SELECT *  FROM library')
        return result
    })

    ipcMain.handle("DB_LIBRARY_MODIFY_CUSTOM_NAMES", async (e, { mediaId, customNames }) => {
        const result = await db.run("UPDATE library SET custom_title = ? , custom_artist = ? WHERE id = ?", [customNames.title, customNames.artist, mediaId])
        return result
    })
}

module.exports = {
    init
}