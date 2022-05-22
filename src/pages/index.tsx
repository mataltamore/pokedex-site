import React from "react";

import { NextPage } from "next/types";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import STATIC_POKEAPI from "../../public/api/static_pokeapi.json";

import HomePage from "../components/pages/Homepage/Homepage";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      STATIC_POKEAPI,
    },
  };
};

const Home: NextPage = ({
  STATIC_POKEAPI,
}: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <>
      <Head>
        <title>Simple Pokedex</title>
        <meta name="description" content="Pokemon fanmade site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage data={STATIC_POKEAPI} />
    </>
  );
};

export default Home;
