import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

const API = "https://pokeapi.co/api/v2/pokemon?limit=10";
const Pokemon = () => {
  const [allPokemons, setAllPokemons] = useState([]);

  const getAllPokemons = async () => {
    try {
      const response = await axios.get(`${API}`);
      console.log(response.data.results);

      const getPokemonDetails = response.data.results.map(async (pokemon) => {
        const response2 = await axios(pokemon.url);
        console.log(response2);
        return response2.data;
      });

      const results = await Promise.all(getPokemonDetails);

      setAllPokemons(results);
    } catch (error) {
      console.error("Ошибка, не удалось получить данные!", error);
    }
  };
  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div>
      <h1 className="h1">Pokemon Cards</h1>
      <div className="pokemon-container">
        {allPokemons.map((pokemon, index) => (
          <figure className="pokemon-card" key={index}>
            <figcaption>Name: {pokemon.name}</figcaption>
            <figcaption>Weight: {pokemon.weight}</figcaption>
            <figcaption>
              Types: {pokemon.types.map((type) => type.type.name).join(", ")}
            </figcaption>
            <img src={pokemon.sprites.front_default} />
          </figure>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Pokemon />
    </div>
  );
};

export default App;
