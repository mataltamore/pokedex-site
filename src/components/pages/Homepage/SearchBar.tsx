import React, { useState, useEffect, useDeferredValue } from "react";
import Image from "next/image";

import imageSearch from "/public/images/search-icon.svg";

import styles from "./Homepage.module.scss";

import { StaticPokeAPI } from "../../../globals/types";

export type SearchBarProps = {
  data: Array<StaticPokeAPI>;
  setPokemons: React.Dispatch<React.SetStateAction<StaticPokeAPI[]>>;
};

const SearchBar = (props: SearchBarProps) => {
  const { data, setPokemons } = props;
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    setPokemons(
      data.filter((pokemon: StaticPokeAPI) =>
        pokemon.name.includes(deferredSearch)
      )
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

export default SearchBar;
