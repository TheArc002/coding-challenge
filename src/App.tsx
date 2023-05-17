import React, { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { RootState } from "./store/store";
import { fetchPokemonsRequest } from './store/pokemonSaga';
import {fetchPokemonDetailsRequest} from './store/pokemonSaga';

function App() {
  const dispatch = useDispatch();
  const { pokemons, error, isLoading } = useSelector(
    (state: RootState) => state.pokemon
  );
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    dispatch(fetchPokemonsRequest());
    console.log(pokemons);
  }, [dispatch]);

  const handlePokemonClick = (pokemon: any) => {
    dispatch(fetchPokemonDetailsRequest(pokemon.name));
    setSelectedPokemon(pokemon);
    handleShowModal();
  };

  const handleScroll = useCallback(() => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = scrollTop + clientHeight >= scrollHeight;
    if (scrolledToBottom && !isLoading) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Pokemons</h1>
      <ListGroup>
        {pokemons.map((pokemon : any, index : any) => (
          <ListGroup.Item
            className=" align-items-center"
            onClick={() => handlePokemonClick(pokemon)}
            key={index}
          >
            <div className="align-items-center">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                style={{ width: "45px", height: "45px" }}
                className="rounded-circle"
              />
              <div className="ms-3">
                <p className="fw-bold mb-1">{pokemon.name}</p>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      {selectedPokemon && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          aria-labelledby="contained-modal-title-vcenter"
          size="sm"
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Pokemon Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={selectedPokemon.image} alt={selectedPokemon.name} />
              <p>Height: {selectedPokemon.height}</p>
              <p>Weight: {selectedPokemon.weight}</p>
              <p>Types: {selectedPokemon.types.join(", ")}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      )}
    </div>
  );
}

export default App;
