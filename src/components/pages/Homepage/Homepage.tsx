import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";

import { StaticPokeAPI } from "../../../globals/types";

import PokeIcon from "/public/images/pokeball.svg";

import Filter from "./Filter";
import SearchBar from "./SearchBar";
import GridCards from "./GridCards";

import styles from "./Homepage.module.scss";

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

const HomePage = ({ data }: InferGetStaticPropsType<GetStaticProps>) => {
  const [pokemons, setPokemons] = useState<Array<StaticPokeAPI>>([]);

  useEffect(() => {
    if (data) setPokemons([...data]);
  }, [data]);

  return (
    <>
      <Header />
      <div className={styles.defaultLayout}>
        <Filter />
        <SearchBar data={data} setPokemons={setPokemons} />
        <GridCards pokemons={pokemons} />
      </div>
    </>
  );
};

export default HomePage;
