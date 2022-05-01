import type { NextPage } from "next";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import PokemonSpeciesAPI from "../../public/api/pokemon-species.json";
import HomePage from "./Homepage/Homepage";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      PokemonSpeciesAPI,
    },
  };
};

const Home: NextPage = ({
  PokemonSpeciesAPI,
}: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <>
      <Head>
        <title>Simple Pokedex</title>
        <meta name="description" content="Pokemon fanmade site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage data={PokemonSpeciesAPI} />
    </>
  );
};

export default Home;
