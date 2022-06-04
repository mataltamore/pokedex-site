import React from "react";
import Image from "next/image";

// import { StaticPokeAPI } from "../../../globals/types";
import STATIC_POKEMONS from "../../../../public/api/static_pokeapi.json";
import ErrorImage from "../../../../public/images/pokeball.svg";
import styles from "./DetailPage.module.scss";

export type PokemonEvolutionProps = {
  color: string;
  evolution: any;
};

type EvolutionCardProps = {
  name: string;
  image: string | undefined;
  color: string;
};

const EvolutionCard = ({ name, image, color }: EvolutionCardProps) => {
  return (
    <div className={styles.evolutionCard}>
      <div className={styles.evolutionCard__image}>
        <Image
          src={image || ErrorImage}
          alt={`pokemon-${name}-image`}
          loading="lazy"
          layout="fill"
        />
      </div>
      <p
        className={styles.evolutionCard__name}
        style={{ backgroundColor: color }}
      >
        {name}
      </p>
    </div>
  );
};

const PokemonEvolution = (props: PokemonEvolutionProps) => {
  const { color, evolution } = props;

  const findPokemonImageByName = (pokemonName: string) =>
    STATIC_POKEMONS.find((mon) => mon.name === pokemonName)?.sprites.official;

  return (
    <section className={styles.evolutionsWrapper}>
      <h2 className={styles.evolutionsWrapper__title} style={{ color }}>
        Evolution Chain
      </h2>
      <div className={styles.evolutionCardsWrapper}>
        <EvolutionCard
          color={color}
          name={evolution.chain.species.name}
          image={findPokemonImageByName(evolution.chain.species.name)}
        />
        {evolution.chain.evolves_to.map((firstStage: any) => {
          return (
            <>
              <EvolutionCard
                key={firstStage.species.name}
                color={color}
                name={firstStage.species.name}
                image={findPokemonImageByName(firstStage.species.name)}
              />
              {firstStage.evolves_to.map((secondStage: any) => {
                return (
                  <EvolutionCard
                    key={secondStage.species.name}
                    color={color}
                    name={secondStage.species.name}
                    image={findPokemonImageByName(secondStage.species.name)}
                  />
                );
              })}
            </>
          );
        })}
      </div>
    </section>
  );
};

export default PokemonEvolution;
