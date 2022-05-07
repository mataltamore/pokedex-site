import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";

import styles from "./HomePage.module.scss";
import PokeIcon from "../../../public/images/pokeball.svg";
import imageSearch from "../../../public/images/searchimg.svg";

import {
  ArrayChildrenProp,
  PokeAPI,
  SearchBarProps,
  CardProps,
} from "../../helpers/types";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__image}>
        <Image src={PokeIcon} alt="pokeball" layout="fill" loading="lazy" />
      </div>
      <h1 className={styles.header__title}>Pokédex</h1>
    </header>
  );
};

const Main = ({ children }: ArrayChildrenProp) => {
  return <div className={styles.defaultLayout}>{children}</div>;
};

const SearchBar = (props: SearchBarProps) => {
  const { data, setPokemons } = props;
  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchBar__input}
          onChange={(e) => {
            setPokemons(
              data.filter((pokemon: PokeAPI) =>
                pokemon.name.includes(e.target.value)
              )
            );
          }}
        />
        <div className={styles.searchBar__image}>
          <Image
            src={imageSearch}
            alt="search-image"
            layout="fill"
            loading="lazy"
          />
        </div>
      </div>
    </div>
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
    <>
      {pokemons.length === 0 ? (
        <p style={{ marginInline: "auto" }}>Loading...</p>
      ) : (
        <div className={styles.gridLayout}>
          {pokemons.map((pokemon: PokeAPI) => {
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
          })}
        </div>
      )}
    </>
  );
};

const Card = (props: CardProps) => {
  const { name, id, imageUrl } = props;

  return (
    <Link href={`/pokemon/${name}?id=${id}`} passHref>
      <article className={styles.card}>
        <h2>
          <span style={{ fontSize: "0.875rem" }}>#</span>
          {id}
        </h2>
        <div className={styles.card__image}>
          <Image
            src={parseInt(id) < 808 ? imageUrl : PokeIcon}
            alt={name}
            layout="fill"
            loading="lazy"
          />
        </div>
        <h2 className={styles.card__name}>{name}</h2>
      </article>
    </Link>
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
      <Main>
        <SearchBar data={data.results} setPokemons={setPokemons} />
        <GridCards pokemons={pokemons} />
      </Main>
    </>
  );
};

export default HomePage;
