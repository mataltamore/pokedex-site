import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";

import styles from "./HomePage.module.scss";
import ImageErrorUrl from "../../../public/images/image-not-found.svg";
import imagePokeball from "../../../public/images/pokeball.png";
import imageSearch from "../../../public/images/searchimg.svg";

import { PokeAPI, SearchBarProps, CardProps } from "../../helpers/types";

const Header = () => {
  return (
    <div className={styles.pokedexTitle}>
      <div className={styles.pokedexTitle__image}>
        <Image src={imagePokeball} alt="pokeball-image" loading="lazy" />
      </div>
      <div>Pokédex</div>
    </div>
  );
};

const SearchBar = (props: SearchBarProps) => {
  const { data, setPokemons } = props;
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__container}>
        <input
          type="text"
          className={styles.searchBar__container__input}
          onChange={(e) => {
            setPokemons(
              data.filter((pokemon: PokeAPI) =>
                pokemon.name.includes(e.target.value)
              )
            );
          }}
        />
        <div className={styles.searchBar__container__image}>
          <Image src={imageSearch} alt="search-image" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

const Card = (props: CardProps) => {
  const { name, id, imageUrl } = props;

  return (
    <Link href={`/pokemon/${name}?id=${id}`} passHref>
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
    </Link>
  );
};

const GridCards = (props: { pokemons: Array<PokeAPI> }) => {
  const { pokemons } = props;

  let pokemonId: string, paddedPokemonId: string, imageUrl: string;
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
  );
};

const HomePage = ({ data }: InferGetStaticPropsType<GetStaticProps>) => {
  const [pokemons, setPokemons] = useState<Array<PokeAPI>>([]);

  useEffect(() => {
    if (data) setPokemons(() => [...data.results]);
  }, [data]);

  return (
    <>
      <Header />
      <SearchBar data={data.results} setPokemons={setPokemons} />
      <GridCards pokemons={pokemons} />
    </>
  );
};

export default HomePage;
