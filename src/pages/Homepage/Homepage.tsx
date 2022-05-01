import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";

import styles from "./Homepage.module.scss";
import ImageError from "../../../public/images/image-not-found.svg";

type PokeAPI = { name: string; url: string };
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

const Homepage = ({ data }: InferGetStaticPropsType<GetStaticProps>) => {
  const [pokemons, setPokemons] = useState<Array<PokeAPI>>([]);
  let pokemonId: string, paddedPokemonId: string, imageUrl: string;

  useEffect(() => {
    if (data) setPokemons((prevPokemons) => [...prevPokemons, ...data.results]);
  }, [data]);

  return (
    <>
      {pokemons.length === 0 ? (
        <div>Data not found</div>
      ) : (
        pokemons.map((pokemon: PokeAPI) => {
          pokemonId = pokemon.url.split("/")[6];
          paddedPokemonId = pokemonId.padStart(3, "0");
          imageUrl = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${paddedPokemonId}.png`;

          return (
            <div key={pokemonId}>
              {pokemon.name}
              <Image
                src={imageUrl}
                alt={pokemon.name}
                loading="lazy"
                width={100}
                height={100}
              />
            </div>
          );
        })
      )}
    </>
  );
};

export default Homepage;
