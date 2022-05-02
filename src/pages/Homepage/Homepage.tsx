import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";

import styles from "./Homepage.module.scss";
import ImageErrorUrl from "../../../public/images/image-not-found.svg";
import imagePokeball from "../../../public/images/pokeball.png";
import imageSearch from "../../../public/images/searchimg.svg";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

type PokeAPI = { name: string; url: string };
type CardProps = { name: string; id: string; imageUrl: string };
type SearchBarProps = {
  data: Array<PokeAPI>;
  setPokemons: React.Dispatch<React.SetStateAction<PokeAPI[]>>;
};

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

const Homepage = ({ data }: InferGetStaticPropsType<GetStaticProps>) => {
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

export default Homepage;
