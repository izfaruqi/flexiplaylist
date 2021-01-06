const electron = require('electron');

window.ipcRenderer = electron.ipcRenderer;
const appPath = electron.remote.require('electron').app.getAppPath()
window.appPath = appPath