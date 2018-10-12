const { Menu } = require('electron')
const { getMainWindow } = require('./mainWindow')

const onClick = (...args) => {
  getMainWindow().webContents.send('app-menu-click', ...args)
}

const projectMenu = {
  label: 'Project',
  submenu: [
    {
      label: 'New',
      role: 'forcereload'
    },
    {
      label: 'Save',
      click: () => { onClick('project-save') },
      accelerator: 'CommandOrControl+S'
    },
    {
      label: 'Save As...',
      click: () => { onClick('project-save-as') },
      accelerator: 'CommandOrControl+Shift+S'
    },
    {
      label: 'Load',
      click: () => { onClick('project-load') }
    }
  ]
}

const template = [
  {
    label: 'Launchpad Editor'
  },
  projectMenu,
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  }
]

const updateMenu = () => {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

module.exports = {
  updateMenu
}
