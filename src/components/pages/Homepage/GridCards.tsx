import React, { useEffect, useState } from "react";
import { StaticPokeAPI } from "../../../globals/types";

import Card from "./Card";

import styles from "./Homepage.module.scss";

const GridCards = (props: { pokemons: Array<StaticPokeAPI> }) => {
  const { pokemons } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (pokemons.length) setIsLoaded(true);
  }, [pokemons]);

  if (!pokemons.length && !isLoaded)
    return <p style={{ marginInline: "auto" }}>Loading...</p>;
  if (!pokemons.length && isLoaded)
    return <p style={{ marginInline: "auto" }}>No pokemons with such name</p>;

  return (
    <div className={styles.gridLayout}>
      {pokemons.map((pokemon: StaticPokeAPI) => {
        return <Card key={pokemon.id} {...pokemon} />;
      })}
    </div>
  );
};

export default GridCards;
