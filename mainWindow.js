const electron = require('electron')
const { BrowserWindow } = electron

// To avoid being garbage collected
let mainWindow

const createMainWindow = () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
}

const getMainWindow = () => mainWindow

module.exports = {
  getMainWindow,
  createMainWindow
}
