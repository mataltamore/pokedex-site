import type { NextPage } from "next";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import PokemonSpeciesAPI from "../../public/api/pokemon-species.json";
import BulbasaurMockAPI from "../../public/api/bulbasaur.json";
import HomePage from "./Homepage/Homepage";
import Pokemon from "./Pokemon/Pokemon";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      PokemonSpeciesAPI,
      BulbasaurMockAPI,
    },
  };
};

const Home: NextPage = ({
  PokemonSpeciesAPI,
  BulbasaurMockAPI,
}: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <>
      <Head>
        <title>Simple Pokedex</title>
        <meta name="description" content="Pokemon fanmade site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage data={PokemonSpeciesAPI} />
      <Pokemon data={BulbasaurMockAPI} />
    </>
  );
};

export default Home;
