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

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)
