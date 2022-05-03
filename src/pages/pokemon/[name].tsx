import React from "react";
import { useEffect, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import DetailPage from "../../components/DetailPage/DetailPage";

const Pokemon: NextPage = () => {
  const router = useRouter();
  const { id, name } = router.query;

  const BASE_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const titleName =
    name && typeof name === "string"
      ? name.charAt(0).toUpperCase() + name.slice(1)
      : "Simple Pokedex";
  const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setPokemonData(data);
    }
    fetchData();
  }, [BASE_URL]);

  return (
    <>
      <Head>
        <title>{titleName}</title>
        <meta name={titleName} content={`${titleName}-description`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DetailPage data={pokemonData} />
    </>
  );
};

export default Pokemon;
