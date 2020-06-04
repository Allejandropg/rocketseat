import React, { Component } from 'react';

import '../css/Header.css';

import logo from '../assets/facebook.png';

{/* <span className="facebook"><img src={logo} alt="facebook." className="logo"/></span> */}
class Header extends Component {
  render(){
    return (
      <header className="header" >
        <div className="header-area">
          <span className="facebook">facebook.</span>
          <a href="#" title="Acessar minha Área" className="minha-area">Meu Perfil <i className="material-icons">account_circle</i></a>
        </div>
      </header>
    );
  }
}

export default Header;