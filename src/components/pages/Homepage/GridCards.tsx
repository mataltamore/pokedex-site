import React, { useContext, useEffect, useState } from "react";
import { StaticPokeAPI } from "../../../globals/types";
import { RegionFilterContext, PokemonTypeContext } from "../../helpers/context";

import Card from "./Card";

import styles from "./Homepage.module.scss";

const GridCards = (props: { pokemons: Array<StaticPokeAPI> }) => {
  const { pokemons } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const regionContext = useContext(RegionFilterContext);
  const pokemonTypeContext = useContext(PokemonTypeContext);

  useEffect(() => {
    if (pokemons.length) setIsLoaded(true);
  }, [pokemons]);

  if (!pokemons.length && !isLoaded)
    return <p style={{ marginInline: "auto" }}>Loading...</p>;
  if (!pokemons.length && isLoaded)
    return <p style={{ marginInline: "auto" }}>No pokemons with such name</p>;

  return (
    <div className={styles.gridLayout}>
      {pokemons
        .filter((pokemon) => {
          const isRegionSelected = regionContext?.value.includes(
            pokemon.generation
          );
          const isTypesSelected =
            pokemonTypeContext?.value.includes(pokemon.types[0].type.name) ||
            (pokemon.types[1] &&
              pokemonTypeContext?.value.includes(pokemon.types[1].type.name));
          return isRegionSelected && isTypesSelected;
        })
        .map((pokemon: StaticPokeAPI) => {
          return <Card key={pokemon.id} {...pokemon} />;
        })}
    </div>
  );
};

export default GridCards;
