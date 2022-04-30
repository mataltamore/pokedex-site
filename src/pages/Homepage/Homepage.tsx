import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.scss";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const BASE_URL_PKMN_INFO = "https://pokeapi.co/api/v2/pokemon/";

type CompleteData = {
  id: number;
  name: string;
  types: Array<{ name: string }>;
  sprite: string;
};

type DataMon = {
  id: number;
  sprites: { other: { "official-artwork": { front_default: string } } };
  types: Array<{ slot: number; type: { name: string; url: string } }>;
};

type Result = { name: string; url: string };

const Homepage = ({
  pokemonList,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  const [data, setData] = useState<Array<CompleteData>>([]);

  useEffect(() => {
    pokemonList.results.forEach(async (mon: Result) => {
      const response = await fetch(BASE_URL_PKMN_INFO + mon.name);
      const data: DataMon = await response.json();

      const newPokemon: CompleteData = {
        id: data.id,
        name: mon.name,
        types: data.types.map((item) => {
          return { name: item.type.name };
        }),
        sprite: data.sprites.other["official-artwork"].front_default,
      };

      setData((prev) => [...prev, newPokemon]);
    });
  }, [pokemonList]);

  return (
    <>
      {data.map((mon: CompleteData) => {
        return <div key={mon.id}>{JSON.stringify(mon)}</div>;
      })}
    </>
  );
};

export default Homepage;
