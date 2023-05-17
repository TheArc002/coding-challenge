import axios from 'axios';

test('fetches data from the PokeAPI', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon/1');
  const data = response.data;
  expect(data.name).toEqual('bulbasaur');
  expect(data.id).toEqual(1);
  expect(data.types[0].type.name).toEqual('grass');
  expect(data.types[1].type.name).toEqual('poison');
});
