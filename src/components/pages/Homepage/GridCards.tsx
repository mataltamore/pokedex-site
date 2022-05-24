import React, { useContext, useEffect, useState } from "react";
import { StaticPokeAPI } from "../../../globals/types";
import { RegionFilterContext } from "../../helpers/context";

import Card from "./Card";

import styles from "./Homepage.module.scss";

const GridCards = (props: { pokemons: Array<StaticPokeAPI> }) => {
  const { pokemons } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const context = useContext(RegionFilterContext);

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
        .filter((pokemon) => context?.value.includes(pokemon.generation))
        .map((pokemon: StaticPokeAPI) => {
          return <Card key={pokemon.id} {...pokemon} />;
        })}
    </div>
  );
};

export default GridCards;
