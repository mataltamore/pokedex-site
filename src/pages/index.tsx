import type { NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import HomePage from "./Homepage/Homepage";

const URL_PKMN_LIST =
  "https://pokeapi.co/api/v2/pokemon-species/?offset=151&limit=6";
const BASE_URL_PKMN_INFO = "https://pokeapi.co/api/v2/pokemon/";

type CompleteData = {
  id: number;
  name: string;
  types: Array<{ name: string }>;
  sprite: string;
};

type DataMon = {
  id: number;
  name: string;
  sprites: { other: { "official-artwork": { front_default: string } } };
  types: Array<{ slot: number; type: { name: string; url: string } }>;
};

type DataList = {
  count: string;
  next: string;
  previous: string;
  results: Array<Result>;
};

type Result = { name: string; url: string };

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(URL_PKMN_LIST);
  const pokemonNameList: DataList = await response.json();

  const arrOfPromises = pokemonNameList.results.map((mon: Result) =>
    fetch(BASE_URL_PKMN_INFO + mon.name)
      .then((res) => res.json())
      .then((res: DataMon) => {
        return {
          id: res.id,
          name: res.name,
          types: res.types.map((item) => {
            return { name: item.type.name };
          }),
          sprite: res.sprites.other["official-artwork"].front_default,
        };
      })
  );
  const pokemonCompleteDataList: Array<CompleteData> = await Promise.all(
    arrOfPromises
  );

  return {
    props: {
      pokemonCompleteDataList,
    },
  };
};

const Home: NextPage = ({
  pokemonCompleteDataList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Simple Pokedex</title>
        <meta name="description" content="Pokemon fanmade site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage data={pokemonCompleteDataList} />
    </>
  );
};

export default Home;
