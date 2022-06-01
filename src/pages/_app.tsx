import React, { useState } from "react";
import type { AppProps } from "next/app";
import "../../styles/index.scss";

import { GenerationNumber } from "../globals/types";

import {
  GenerationTypeFilterContext,
  RegionFilterContext,
  PokemonTypeContext,
} from "../components/helpers/context";

function MyApp({ Component, pageProps }: AppProps) {
  const [generationTypeRadioBtn, setGenerationTypeRadioBtn] = useState(6);
  const [regionNumberCheckBtn, setRegionNumberCheckBtn] = useState<
    Array<GenerationNumber>
  >([
    "generation-i",
    "generation-ii",
    "generation-iii",
    "generation-iv",
    "generation-v",
    "generation-vi",
    "generation-vii",
    "generation-viii",
  ]);
  const [pokemonTypeCheckBtn, setPokemonTypeCheckBtn] = useState<Array<string>>(
    [
      "normal",
      "fire",
      "fight",
      "water",
      "flying",
      "grass",
      "poison",
      "electric",
      "ground",
      "psychic",
      "rock",
      "ice",
      "bug",
      "dragon",
      "ghost",
      "dark",
      "steel",
      "fairy",
    ]
  );

  return (
    <PokemonTypeContext.Provider
      value={{ value: pokemonTypeCheckBtn, setValue: setPokemonTypeCheckBtn }}
    >
      <RegionFilterContext.Provider
        value={{
          value: regionNumberCheckBtn,
          setValue: setRegionNumberCheckBtn,
        }}
      >
        <GenerationTypeFilterContext.Provider
          value={{
            value: generationTypeRadioBtn,
            setValue: setGenerationTypeRadioBtn,
          }}
        >
          <Component {...pageProps} />
        </GenerationTypeFilterContext.Provider>
      </RegionFilterContext.Provider>
    </PokemonTypeContext.Provider>
  );
}

export default MyApp;
