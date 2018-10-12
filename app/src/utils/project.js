import { remote } from 'electron'
import { save, load } from './file'

const fileFilters = [
  { name: 'JSON', extensions: ['json'] }
]

let projectFilePath

const convertData = cells => cells.map(cell => cell.colorIndex)

export const projectSaveAs = cells => {
  remote.dialog.showSaveDialog({
    filters: fileFilters
  },
  filePath => {
    if (filePath) {
      projectFilePath = filePath
      projectSave(cells)
    }
  })
}

export const projectSave = cells => {
  if (projectFilePath) {
    save(projectFilePath, convertData(cells))
  } else {
    projectSaveAs(cells)
  }
}

export const projectLoad = () => {
  return new Promise((resolve, reject) => {
    remote.dialog.showOpenDialog({
      filters: fileFilters
    },
    filePath => {
      if (filePath) {
        projectFilePath = filePath[0]
        load(projectFilePath).then(data => {
          resolve(data)
        })
      } else {
        reject(new Error('Failed to get filepath'))
      }
    })
  })
}
