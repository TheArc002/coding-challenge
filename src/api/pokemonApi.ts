import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

export const pokemonApi = {
  fetchPokemons: async (offset: number = 0, limit: number = 20) => {
    try {
      const response = await axios.get(
        `${BASE_URL}pokemon?offset=${offset}&limit=${limit}`
      );
      return response.data.results;
    } catch (error : any) {
      throw new Error(error.response?.data?.message ?? "Failed to fetch pokemons");
    }
  },

  fetchPokemonDetails: async (name = "") => {
    try {
      const response = await axios.get(`${BASE_URL}pokemon/${name}`);
      const { height, weight, types, sprites } = response.data;
      const pokemon = {
        name,
        height,
        weight,
        image: sprites.front_default,
        types: types.map((type: any) => type.type.name),
      };
      return pokemon;
    } catch (error : any) {
      throw new Error(error.response?.data?.message ?? `Failed to fetch pokemon ${name}`);
    }
  },
};
