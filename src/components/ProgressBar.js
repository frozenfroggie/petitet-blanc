import React from 'react'
import styled from "styled-components"

const ProgressBarStyled = styled.div`
  position: relative;
  grid-area: scrollDown;
  display: flex;
  align-self: center;
  justify-self: center;
  justify-content: space-evenly;
  align-items: center;
  width: 300px;
  height: 50px;
  border-radius: 50px;
  border: 2px solid #339933;
  &:before {
    transition: left 0.5s;
    display: block;
    position: absolute;
    top: 10px;
    box-sizing: border-box;
    left: ${props => `${((props.activeDot) * 47) + 10}px`};
    content: '';
    width: 40px;
    height: 26px;
    background-color: transparent;
    border: 2px solid #339933;
    border-radius: 15px;
    opacity: 1;
  }
`

const DotContainer = styled.div`
  border-radius: 50%;
  padding: 12px;
  background-color: transparent;
  transition: background-color .5s;
  &:hover {
    cursor: pointer;
    @media only screen and (min-width: 1088px) {
      background-color: rgba(250,250,250,0.8);
    }
  }
`

const Dot = styled.div`
  border-radius: 50%;
  width: 7px;
  height: 7px;
  transition: background-color .5s;
  background-color: ${props => props.isActive ? '#339933' : '#99cc66'};
  &:hover {
    cursor: pointer;
  }
`

const ProgressBar = ({ activeDot, activateDot }) => (
  <ProgressBarStyled activeDot={activeDot}>
    <DotContainer onClick={() => activateDot(0)}>
      <Dot isActive={activeDot === 0}></Dot>
    </DotContainer>
    <DotContainer onClick={() => activateDot(1)}>
      <Dot isActive={activeDot === 1}></Dot>
    </DotContainer>
    <DotContainer onClick={() => activateDot(2)}>
      <Dot isActive={activeDot === 2}></Dot>
    </DotContainer>
    <DotContainer onClick={() => activateDot(3)}>
      <Dot isActive={activeDot === 3}></Dot>
    </DotContainer>
    <DotContainer onClick={() => activateDot(4)}>
      <Dot isActive={activeDot === 4}></Dot>
    </DotContainer>
    <DotContainer onClick={() => activateDot(5)}>
      <Dot isActive={activeDot === 5}></Dot>
    </DotContainer>
  </ProgressBarStyled>
)

export default ProgressBar
