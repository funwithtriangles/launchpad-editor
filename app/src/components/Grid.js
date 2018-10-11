import React from 'react'
import styled from 'styled-components'
import Cell from './Cell'

const gridSize = 8
const cellWidth = 100/gridSize

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 9px solid #222;
`

const Item = styled.div`
  width: ${cellWidth}%;
`

const Grid = ({cells}) => (
  <Wrapper>
    {cells.map((cell, index) =>
      <Item key={index}>
        <Cell {...cell} />
      </Item>
    )}
  </Wrapper>
)

export default Grid
