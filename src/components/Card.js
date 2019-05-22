import React from 'react'
import styled from "styled-components"
import { navigate } from '@reach/router';

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media only screen and (min-width: 1088px) {
    justify-content: space-between;
    flex-direction: row;
  }
  align-items: center;
  width: 100%;
  height: 100vh;
`

const CardStyled = styled.div`
  top: -70px;
  width: 100vw;
  height: calc(100vw / 1.5);
  @media only screen and (min-width: 1088px) {
    width: 550px;
    height: 330px;
    top: 20px;
  }
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-image: url(${props => props.img});
  background-position: center;
  background-size: cover;
  border-radius: 5px;
  transition: all .5s;
  &:hover {
    cursor: pointer;
    /* box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); */
  }
  @media only screen and (min-width: 1088px) {
    margin-left: 90px;
  }
`

const CardButtonStyled = styled.button`
  height: 100px;
  margin-top: -50px;
  @media only screen and (min-width: 1088px) {
    margin-top: 0px;
    height: auto;
    font-size: 8em;
    width: calc(100% - 500px);
    position: relative;
    top: ${props => props.top}px;
  }
  font-size: 5em;
  display: flex;
  flex-direction: column;
  align-items: space-around;
  justify-content: flex-start;
  /* min-height: 200px; */
  padding: 10px 65px;
  /* color: rgba(255,255,255,.9); */
  color: rgba(0,0,0,.3);
  letter-spacing: -4px;
  /* text-shadow: 0 0 5px rgba(250,250,250,1); */
  background-color: transparent;
  /* background-color: #339933; */
  border: none;
  /* border-radius: 25px; */
  /* box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); */
  white-space: pre;
  font-weight: 400;
  font-family: 'Lato', sans-serif;
  line-height: 0.85em;
  transition: all 0.5s;
  span {
    display: inline-block;
    font-weight: 300;
  }
`

const Card = ({ children, img, shouldShowCard, tab, idx }) => (
  <CardContainer>
    <CardStyled img={img} style={shouldShowCard ? {opacity: 1, transform: 'translateX(0%)'} : {opacity: 0, transform: 'translateX(5%)'}} onClick={
      () => navigate(tab)
    }>
    </CardStyled>
    <CardButtonStyled top={idx === 1 || idx === 2 ? 82 : 135} style={shouldShowCard ? {opacity: 1, transform: 'translateX(0%)'} : {opacity: 0, transform: 'translateX(5%)'}}
      dangerouslySetInnerHTML={{ __html: children }}>
    </CardButtonStyled>
  </CardContainer>
)

export default Card
