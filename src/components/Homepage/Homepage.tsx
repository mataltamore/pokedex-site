import React, { useEffect, useState, useDeferredValue } from "react";
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
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    setPokemons(
      data.filter((pokemon: PokeAPI) => pokemon.name.includes(deferredSearch))
    );
  }, [deferredSearch, setPokemons, data]);

  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search a name..."
          className={styles.searchBar__input}
          onChange={(e) => {
            setSearch(e.target.value);
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
      {pokemons.map((pokemon: PokeAPI) => {
        return <Card key={pokemon.id} {...pokemon} />;
      })}
    </div>
  );
};

const Card = (props: PokeAPI) => {
  const { id, name, types, past_types: pastTypes, sprites } = props;

  return (
    <Link href={`/pokemon/${name}?id=${id}`} passHref>
      <article className={styles.card}>
        <h2>
          <span style={{ fontSize: "0.875rem" }}>#</span>
          {id}
        </h2>
        <div className={styles.card__image}>
          <Image
            src={sprites.official}
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
    if (data) setPokemons(() => [...data]);
  }, [data]);

  return (
    <>
      <Header />
      <Main>
        <SearchBar data={data} setPokemons={setPokemons} />
        <GridCards pokemons={pokemons} />
      </Main>
    </>
  );
};

export default HomePage;
