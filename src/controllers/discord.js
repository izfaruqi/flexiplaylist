const ipcRenderer = window.ipcRenderer

export function updateRichPresence(activity){
    console.log(activity)
    ipcRenderer.invoke("DISCORD_ACTIVITY_SET", { activity: activity })
}
