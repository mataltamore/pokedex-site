import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";

import styles from "./Homepage.module.scss";
import ImageErrorUrl from "../../../public/images/image-not-found.svg";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

type PokeAPI = { name: string; url: string };
type CardProps = { name: string; id: string; imageUrl: string };

enum ColorType {
  normal = "rgb(168, 168, 120)",
  fire = "rgb(240, 128, 48)",
  fighting = "rgb(192, 48, 40)",
  water = "rgb(104, 144, 240)",
  flying = "rgb(168, 144, 240)",
  grass = "rgb(120, 200, 80)",
  poison = "rgb(160, 64, 160)",
  electric = "rgb(248, 208, 48)",
  ground = "rgb(224, 192, 104)",
  psychic = "rgb(248, 88, 136)",
  rock = "rgb(184, 160, 56)",
  ice = "rgb(152, 216, 216)",
  bug = "rgb(168, 184, 32)",
  dragon = "rgb(112, 56, 248)",
  ghost = "rgb(112, 88, 152)",
  dark = "rgb(112, 88, 72)",
  steel = "rgb(184, 184, 208)",
  fairy = "rgb(238, 153, 172)",
}

const Card = (props: CardProps) => {
  const { name, id, imageUrl } = props;

  return (
    <div className={styles.singleItem}>
      <div className={styles.singleItem__id}>#{id}</div>
      <div className={styles.singleItem__image}>
        <Image
          src={parseInt(id) < 808 ? imageUrl : ImageErrorUrl}
          alt={name}
          loading="lazy"
          layout="fill"
        />
      </div>
      <div className={styles.singleItem__name}>{name}</div>
    </div>
  );
};

const Homepage = ({ data }: InferGetStaticPropsType<GetStaticProps>) => {
  const [pokemons, setPokemons] = useState<Array<PokeAPI>>([]);
  let pokemonId: string, paddedPokemonId: string, imageUrl: string;

  useEffect(() => {
    if (data) setPokemons(() => [...data.results]);
  }, [data]);

  function extractIdFromUrl(url: string) {
    pokemonId = url.split("/")[6];
    paddedPokemonId = pokemonId.padStart(3, "0");

    return [pokemonId, paddedPokemonId];
  }

  function getImageById(id: string, compressed: boolean = false) {
    return compressed
      ? `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${id}.png`
      : `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${id}.png`;
  }

  return (
    <>
      <div>logo</div>
      <div>search bar</div>
      <div className={styles.cardItems}>
        {pokemons.length === 0 ? (
          <div>Data not found</div>
        ) : (
          pokemons.map((pokemon: PokeAPI) => {
            [pokemonId, paddedPokemonId] = extractIdFromUrl(pokemon.url);
            imageUrl = getImageById(paddedPokemonId, true);

            return (
              <Card
                key={pokemonId}
                name={pokemon.name}
                id={pokemonId}
                imageUrl={imageUrl}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Homepage;
