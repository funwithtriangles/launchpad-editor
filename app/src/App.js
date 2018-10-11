import React, { Component } from 'react'
import styled from 'styled-components'
import Grid from './components/Grid'

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
    for (let i = 0; i < 64; i++) {
      cells.push({
        color: colors[0],
        colorIndex: 0,
        onClick: () => toggleColor(i)
      })
    }

    this.state = {
      cells
    }

    const toggleColor = index => {
      const cells = this.state.cells
      let nextIndex = cells[index].colorIndex + 1
      if (nextIndex >= colors.length) nextIndex = 0

      cells[index].color = colors[nextIndex]
      cells[index].colorIndex = nextIndex

      this.setState({ cells })
    }
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
