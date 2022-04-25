import type { NextPage } from "next";
import Head from "next/head";
import HomePage from "./Homepage/Homepage";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Simple Pokedex</title>
        <meta name="description" content="Pokemon fanmade site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
