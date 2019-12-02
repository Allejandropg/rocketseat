import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { updateProfileResquest } from '~/store/modules/user/actions';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmite(data) {
    dispatch(updateProfileResquest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmite}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço de email" />

        <hr />
        <Input name="password" type="password" placeholder="Sua senha atual" />
        <Input
          name="password"
          type="confirmPassword"
          placeholder="Confirm sua senha"
        />

        <button type="submit">Atualizar perfil</button>
      </Form>
      <button type="button">Sair do GoBarber</button>
    </Container>
  );
}
