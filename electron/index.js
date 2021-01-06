const { app, BrowserWindow, protocol } = require('electron')
const path = require('path')


function createWindow () {
  const win = new BrowserWindow({
    width: 720,
    height: 900,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
  createWindow()
  require('./discord')
  require('./db').init()
  require('./library').init()
  require('./youtube-dl').init(BrowserWindow.getFocusedWindow())
  protocol.registerFileProtocol('file', (request, callback) => {
    const pathname = decodeURI(request.url.replace('file:///', ''));
    callback(pathname);
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

