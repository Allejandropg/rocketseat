// test('se eu chamar a rota /authenticate com um usuário válido, ela deve me retornar o user e um token', () => {});
function soma(a, b) {
  return a + b;
}

test('if i call soma function with 4 and 5 it should return 9', () => {
  const result = soma(4, 5);
  expect(result).toBe(9);
});
