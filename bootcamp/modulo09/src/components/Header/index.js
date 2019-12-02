import React from 'react';
import { Link } from 'react-router-dom';
import Notifications from '../Notifications';

import logo from '~/assets/logo-purple.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>Allejandro</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/70/abott@adorable.png"
              alt="Allejandro"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
