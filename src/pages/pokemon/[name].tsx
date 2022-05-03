import React from "react";
import { useEffect, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import DetailPage from "../../components/DetailPage/DetailPage";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id, name } = query;

  const BASE_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const titleName =
    name && typeof name === "string"
      ? name.charAt(0).toUpperCase() + name.slice(1)
      : "Simple Pokedex";

  const response = await fetch(BASE_URL);
  const pokemonData = await response.json();

  return {
    props: { pokemonData, titleName },
  };
};

const Pokemon: NextPage = ({
  pokemonData,
  titleName,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
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
