/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

export default function Cart() {
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src="https://static.netshoes.com.br/produtos/tenis-adidas-duramo-lite-2-0-masculino/28/COL-3586-128/COL-3586-128_detalhe2.jpg?ims=326x"
                alt="Tênis"
              />
            </td>
            <td>
              <strong>Tênis muito massa</strong>
              <span>R$129,00 </span>
            </td>
            <td>
              <div>
                <button type="button">
                  <MdRemoveCircleOutline size={20} color="#7159C1" />
                </button>
                <input type="numer" readOnly value={1} />
                <button type="button">
                  <MdAddCircleOutline size={20} color="#7159C1" />
                </button>
              </div>
            </td>
            <td>
              <strong>R$258,00</strong>
            </td>
            <td>
              <button type="button">
                <MdDelete size={20} color="#7159C1" />
              </button>
            </td>
          </tr>
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar Pedido</button>
        <Total>
          <span>Total</span>
          <strong>R$1920,28</strong>
        </Total>
      </footer>
    </Container>
  );
}
