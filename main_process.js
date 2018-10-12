const { createMainWindow } = require('./mainWindow')
const menu = require('./menu')
const electron = require('electron')
const { app } = electron

// To avoid being garbage collected
let mainWindow

app.on('ready', () => {
  menu.updateMenu()
  createMainWindow()
})

module.exports = {
  mainWindow
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Let electron reloads by itself when webpack watches changes in ./app/
if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname)
}
