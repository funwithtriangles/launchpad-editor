import { ipcRenderer } from 'electron'

import React, { Component } from 'react'
import styled from 'styled-components'
import Grid from './components/Grid'
import { controlLight, clear, sendAll } from './utils/launchpadControls.js'

import { projectSave, projectSaveAs, projectLoad } from './utils/project'

const colors = [
  'black',
  'green',
  'red',
  'orange'
]

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const GridContainer = styled.div`
  width: 70%;
`

export default class App extends Component {
  constructor () {
    super()

    const cells = []
    for (let i = 0; i < 72; i++) {
      cells.push({
        type: i % 9 === 8 ? 'circle' : 'square',
        color: colors[0],
        colorIndex: 0,
        onClick: () => toggleColor(i)
      })
    }

    this.state = {
      cells
    }

    this.device = null

    const toggleColor = index => {
      const cells = this.state.cells
      let nextIndex = cells[index].colorIndex + 1
      if (nextIndex >= colors.length) nextIndex = 0

      cells[index].color = colors[nextIndex]
      cells[index].colorIndex = nextIndex

      this.setState({ cells })

      controlLight(this.midiAccess, this.device.id, index, colors[nextIndex])
    }

    const processDevices = midiAccess => {
      this.midiAccess = midiAccess

      const devices = {}

      midiAccess.outputs.forEach((entry) => {
        devices[entry.name] = {
          title: entry.name,
          id: entry.id,
          manufacturer: entry.manufacturer,
          bankIndex: 0
        }
      })

      this.device = devices['Launchpad Mini']

      if (this.device) {
        clear(this.midiAccess, this.device.id)
      }
    }

    navigator.requestMIDIAccess().then((midiAccess) => {
      processDevices(midiAccess)

      midiAccess.onstatechange = () => {
        processDevices(midiAccess)
      }
    })

    ipcRenderer.on('app-menu-click', (e, id, ...args) => {
      switch (id) {
        case 'project-save':
          projectSave(this.state.cells)
          break
        case 'project-save-as':
          projectSaveAs(this.state.cells)
          break
        case 'project-load':
          projectLoad().then(data => {
            const cells = []
            data.forEach((colorIndex, i) => {
              cells.push({
                type: i % 9 === 8 ? 'circle' : 'square',
                color: colors[colorIndex],
                colorIndex,
                onClick: () => toggleColor(i)
              })
            })

            this.setState({ cells })
            sendAll(this.midiAccess, this.device.id, cells)
          })

          break
      }
    })
  }

  render () {
    return (
      <Wrapper>
        <GridContainer>
          <Grid cells={this.state.cells} />
        </GridContainer>
      </Wrapper>
    )
  }
}
