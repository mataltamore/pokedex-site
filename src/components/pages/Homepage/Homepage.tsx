import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";

import { GenerationNumber, StaticPokeAPI } from "../../../globals/types";

import PokeIcon from "/public/images/pokeball.svg";

import Filter from "./Filter";
import SearchBar from "./SearchBar";
import GridCards from "./GridCards";

import {
  GenerationTypeFilterContext,
  RegionFilterContext,
} from "../../helpers/context";

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
  const [generationTypeRadioBtn, setGenerationTypeRadioBtn] = useState(6);
  const [regionNumberCheckBtn, setRegionNumberCheckBtn] = useState<
    Array<GenerationNumber>
  >([
    "generation-i",
    "generation-ii",
    "generation-iii",
    "generation-iv",
    "generation-v",
    "generation-vi",
    "generation-vii",
    "generation-viii",
  ]);

  useEffect(() => {
    if (data) setPokemons([...data]);
  }, [data]);

  return (
    <>
      <Header />
      <div className={styles.defaultLayout}>
        <RegionFilterContext.Provider
          value={{
            value: regionNumberCheckBtn,
            setValue: setRegionNumberCheckBtn,
          }}
        >
          <GenerationTypeFilterContext.Provider
            value={{
              value: generationTypeRadioBtn,
              setValue: setGenerationTypeRadioBtn,
            }}
          >
            <Filter />
            <SearchBar data={data} setPokemons={setPokemons} />
            <GridCards pokemons={pokemons} />
          </GenerationTypeFilterContext.Provider>
        </RegionFilterContext.Provider>
      </div>
    </>
  );
};

export default HomePage;
