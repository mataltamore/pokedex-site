import React, { useEffect, useState } from "react";
import { StaticPokeAPI } from "../../../globals/types";
import { useGlobalFilter } from "../../../globals/context/GlobalFilter/context";

import Card from "./Card";

import styles from "./Homepage.module.scss";

const GridCards = (props: { pokemons: Array<StaticPokeAPI> }) => {
  const { pokemons } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const { state: stateFilter } = useGlobalFilter();

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
          const isRegionSelected = stateFilter.regionNumberCheckBtn.includes(
            pokemon.generation
          );
          const isTypesSelected =
            stateFilter.pokemonTypeCheckBtn.includes(
              pokemon.types[0].type.name
            ) ||
            (pokemon.types[1] &&
              stateFilter.pokemonTypeCheckBtn.includes(
                pokemon.types[1].type.name
              ));
          return isRegionSelected && isTypesSelected;
        })
        .map((pokemon: StaticPokeAPI) => {
          return <Card key={pokemon.id} {...pokemon} />;
        })}
    </div>
  );
};

export default GridCards;
