import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  background: ${props => props.color};
  padding-bottom: 100%;
  height: 0;
  border-radius: ${props => props.type === 'circle' ? '100%' : '0'};
`

const Inner = styled.div`
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  border: 3px solid #222;
  border-radius: inherit;
`

const Cell = (props) => (
  <Wrapper {...props} ><Inner /></Wrapper>
)

export default Cell
