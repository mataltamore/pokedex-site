import type { NextPage } from "next";
import Head from "next/head";
import HomePage from "./Homepage/Homepage";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
const URL_PKMN_LIST =
  "https://pokeapi.co/api/v2/pokemon-species/?offset=151&limit=3";

type DataList = {
  count: string;
  next: string;
  previous: string;
  results: Array<Result>;
};

type Result = { name: string; url: string };

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(URL_PKMN_LIST);
  const pokemonList: DataList = await response.json();

  return {
    props: {
      pokemonList,
    },
  };
};

const Home: NextPage = ({
  pokemonList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Simple Pokedex</title>
        <meta name="description" content="Pokemon fanmade site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage pokemonList={pokemonList} />
    </>
  );
};

export default Home;
