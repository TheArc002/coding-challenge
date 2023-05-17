import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { pokemonApi } from '../api/pokemonApi';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [],
    pokemonDetails: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchPokemonsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPokemonsSuccess: (state, action) => {
      state.isLoading = false;
      state.pokemons = action.payload;
    },
    fetchPokemonsError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchPokemonDetailsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPokemonDetailsSuccess: (state, action) => {
      state.isLoading = false;
      state.pokemonDetails = action.payload;
    },
    fetchPokemonDetailsError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPokemonsRequest,
  fetchPokemonsSuccess,
  fetchPokemonsError,
  fetchPokemonDetailsRequest,
  fetchPokemonDetailsSuccess,
  fetchPokemonDetailsError,
} = pokemonSlice.actions;

function* fetchPokemonsSaga(action  : any) : any {
  try {
    const pokemons = yield call(pokemonApi.fetchPokemons, 0 ,20);
    yield put(fetchPokemonsSuccess(pokemons));
  } catch (error : any) {
    yield put(fetchPokemonsError(error.message));
  }
}

function* fetchPokemonDetailsSaga(action: any) : any {
  try {
    const pokemon = yield call(pokemonApi.fetchPokemonDetails, action.payload.name);
    yield put(fetchPokemonDetailsSuccess(pokemon));
  } catch (error : any) {
    yield put(fetchPokemonDetailsError(error.message));
  }
}

export function* pokemonSaga() {
  yield takeLatest(fetchPokemonsRequest.type, fetchPokemonsSaga);
  yield takeLatest(fetchPokemonDetailsRequest.type, fetchPokemonDetailsSaga);
}

export default pokemonSlice.reducer;
