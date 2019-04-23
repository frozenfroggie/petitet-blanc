import React from 'react'
import styled from "styled-components"
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const CardStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 500px;
  height: 300px;
  background-image: url(${props => props.img});
  background-position: center;
  background-size: cover;
  border-radius: 5px;
  transition: all .7s;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`

const CardButtonStyled = styled.button`
  position: relative;
  top: 100px;
  display: block;
  width: 200px;
  height: 50px;
  padding: 10px 30px;
  color: white;
  background-color: #339933;
  border: none;
  border-radius: 25px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  font-size: 1.5em;
`

const Card = ({ children, img, shouldShowCard, idx }) => (
  <CardContainer>
    <CardStyled img={img} style={shouldShowCard ? {opacity: 1, transform: 'translateY(-10%)'} : {opacity: 0, transform: 'translateY(10%)'}}>
      <CardButtonStyled>
        {
          children
        }
      </CardButtonStyled>
    </CardStyled>
  </CardContainer>
)

export default Card
