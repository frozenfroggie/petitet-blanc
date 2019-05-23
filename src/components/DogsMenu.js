import React from 'react';
import { navigate } from '@reach/router';
import { FaMars, FaVenus, FaVenusMars } from 'react-icons/fa';
import styled from "styled-components"
import Tappable from 'react-tappable';

const DogMenuStyled = styled.div`
  position: relative;
  top: -100px;
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  @media only screen and (min-width: 1088px) {
    flex-direction: row;
  }
  justify-content: space-evenly;
  align-items: center;
`

const Option = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  background-color: ${props => props.bgColor};
  background: linear-gradient(to bottom, ${props => props.bgColor1}, ${props => props.bgColor2});
  @media only screen and (min-width: 1088px) {
    background: linear-gradient(to right, ${props => props.bgColor1}, ${props => props.bgColor2});
  }
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform .3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`

const Gender = styled.div`
  position: absolute;
  bottom: -50px;
  left: 0px;
  width: 100px;
  text-align: center;
  font-weight: 800;
  font-size: 1.5em;
  color: #A1A1A2;
`

const DogMenu = props => (
  <DogMenuStyled>
    <Tappable onTap={() => navigate('/dogs/male')}>
      <Option bgColor='#19A1FF' onClick={() => navigate('/dogs/male')}>
        <FaMars style={{color: '#E7E9E8'}} size="2em"/>
        <Gender>Psy</Gender>
      </Option>
    </Tappable>
    <Tappable onTap={() => navigate('/dogs/veteran')}>
      <Option bgColor1="#19A1FF" bgColor2="#FF0075" onClick={() => navigate('/dogs/veteran')}>
        <FaVenusMars style={{color: '#E7E9E8'}} size="2em"/>
        <Gender>Weterany</Gender>
      </Option>
    </Tappable>
    <Tappable onTap={() => navigate('/dogs/female')}>
      <Option bgColor='#FF0075' onClick={() => navigate('/dogs/female')}>
        <FaVenus style={{color: '#E7E9E8'}} size="2em"/>
        <Gender>Suki</Gender>
      </Option>
    </Tappable>
  </DogMenuStyled>
)

export default DogMenu;
