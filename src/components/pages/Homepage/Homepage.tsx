import React, { useEffect, useState, createContext } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";

import PokeIcon from "/public/images/pokeball.svg";

import Filter from "./Filter";
import SearchBar from "./SearchBar";
import GridCards from "./GridCards";

import styles from "./Homepage.module.scss";
import { StaticPokeAPI } from "../../../globals/types";

type contextType = {
  value: number;
  setValue: Function;
};
export const GenerationFilterContext = createContext<contextType | undefined>(
  undefined
);

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
  const [generationTypeRadioBtn, setGenerationTypeRadioBtn] = useState(6);

  useEffect(() => {
    if (data) setPokemons([...data]);
  }, [data]);

  return (
    <>
      <Header />
      <div className={styles.defaultLayout}>
        <GenerationFilterContext.Provider
          value={{
            value: generationTypeRadioBtn,
            setValue: setGenerationTypeRadioBtn,
          }}
        >
          <Filter />
          <SearchBar data={data} setPokemons={setPokemons} />
          <GridCards pokemons={pokemons} />
        </GenerationFilterContext.Provider>
      </div>
    </>
  );
};

export default HomePage;
