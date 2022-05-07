import React from "react";

import { NextPage } from "next/types";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import PokemonSpeciesAPI from "../../public/api/pokemon-species.json";

import HomePage from "../components/Homepage/Homepage";

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
