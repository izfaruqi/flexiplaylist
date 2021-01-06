const DiscordRPC = require('discord-rpc')
const { BrowserWindow, ipcMain } = require('electron')
const clientId = '790593651893469225';

DiscordRPC.register(clientId);
const rpc = new DiscordRPC.Client({ transport: 'ipc' });

ipcMain.handle("DISCORD_ACTIVITY_SET", (e, { activity }) => {
    activityWaiting = activity
})
let activityWaiting = null

rpc.on('ready', () => {
    setInterval(() => {
        if(activityWaiting != null){
            rpc.setActivity(activityWaiting)
            activityWaiting = null
        }
    }, 5000)
});

rpc.login({ clientId }).catch(console.error);

