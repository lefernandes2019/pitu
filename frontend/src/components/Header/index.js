import React from 'react';
import { HeaderContainer, Logo } from './style';
import Icone from '../../assets/icon_pitu.svg';

const Header = (props) => {
  return (
    <>
      <HeaderContainer>
        <Logo src={Icone} alt="Pitu - Encurtador de URL" />
        <h1>Pitu</h1>
        <br />
        <h5>{props.children}</h5>
      </HeaderContainer>
    </>
  );
};

export default Header;
