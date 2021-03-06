'use strict'

const { app, BrowserWindow } = require('electron')
const path = require('path')
const { format } = require('url')
const server = require('./backend')
const config = require('./config')

const isProd = process.env.NODE_ENV.trim() === 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  const window = new BrowserWindow({
    width: 900,
    height: 600,
    frame: false
  })

  if (!isProd) {
    window.webContents.openDevTools()
    window.loadURL('http://localhost:8597')
  }
  else {
    window.loadURL(format({
      pathname: path.join(__dirname, 'dist', 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}


server.listen(config.get('api.port'), 'localhost', ()=> console.log(`API Server listening on port http://localhost:9527`))

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})