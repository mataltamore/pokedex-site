import React, { useState } from "react";
import Image from "next/image";

import { GenerationNumber, PokemonTypeName } from "../../../globals/types";

import {
  useGlobalFilter,
  ContextType,
} from "../../../globals/context/GlobalFilter/context";
import { ACTION } from "../../../globals/context/GlobalFilter/reducer";

import FilterIcon from "../../../../public/images/filter-icon.svg";

import styles from "./Homepage.module.scss";

const GenerationTypesFilter = ({ state, dispatch }: ContextType) => {
  const isChecked = (radioValue: number) =>
    state.generationTypeRadioBtn === radioValue;

  return (
    <div className={styles.generationTypesFilter}>
      <legend>Select types by generation:</legend>
      <div>
        <label>
          <input
            type="radio"
            name="genTypes"
            value="6"
            onClick={() => dispatch({ type: ACTION.GENERATION, payload: 6 })}
            defaultChecked={isChecked(6)}
          />
          6+
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="genTypes"
            onClick={() => dispatch({ type: ACTION.GENERATION, payload: 5 })}
            defaultChecked={isChecked(5)}
          />
          2-5
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="genTypes"
            onClick={() => dispatch({ type: ACTION.GENERATION, payload: 1 })}
            defaultChecked={isChecked(1)}
          />
          1
        </label>
      </div>
    </div>
  );
};

const RegionFilter = ({ state, dispatch }: ContextType) => {
  const regions: Array<{ name: string; number: GenerationNumber }> = [
    {
      name: "Kanto",
      number: "generation-i",
    },
    {
      name: "Johto",
      number: "generation-ii",
    },
    {
      name: "Hoenn",
      number: "generation-iii",
    },
    {
      name: "Sinnoh",
      number: "generation-iv",
    },
    {
      name: "Unova",
      number: "generation-v",
    },
    {
      name: "Kalos",
      number: "generation-vi",
    },
    {
      name: "Alola",
      number: "generation-vii",
    },
    {
      name: "Galar",
      number: "generation-viii",
    },
  ];

  const isChecked = (regionNumber: GenerationNumber) =>
    state.regionNumberCheckBtn.includes(regionNumber);

  return (
    <div className={styles.generationTypesFilter}>
      <legend>Select pokemon by region:</legend>
      {regions.map((region) => {
        return (
          <div key={region.name}>
            <label>
              <input
                type="checkbox"
                name="genNumber"
                onClick={(event: React.MouseEvent) => {
                  const target = event.currentTarget as HTMLInputElement;
                  dispatch({
                    type: ACTION.REGION,
                    payload: {
                      isChecked: target.checked,
                      regionNumber: region.number,
                    },
                  });
                }}
                defaultChecked={isChecked(region.number)}
              />
              {region.name}
            </label>
          </div>
        );
      })}
    </div>
  );
};

const TypesFilter = ({ state, dispatch }: ContextType) => {
  const pokemonTypes: Array<PokemonTypeName> = [
    "normal",
    "fire",
    "fighting",
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
  ];

  const isChecked = (pokemonType: PokemonTypeName) =>
    state.pokemonTypeCheckBtn.includes(pokemonType);

  return (
    <div className={styles.generationTypesFilter}>
      <legend>Select pokemons by type:</legend>
      {pokemonTypes.map((pokemonType) => {
        return (
          <div key={pokemonType}>
            <label>
              <input
                type="checkbox"
                name="pokemonType"
                onClick={(event: React.MouseEvent) => {
                  const target = event.currentTarget as HTMLInputElement;
                  dispatch({
                    type: ACTION.TYPE,
                    payload: {
                      isChecked: target.checked,
                      pokemonType,
                    },
                  });
                }}
                defaultChecked={isChecked(pokemonType)}
              />
              {pokemonType}
            </label>
          </div>
        );
      })}
    </div>
  );
};

const Filter = () => {
  const { state, dispatch } = useGlobalFilter();

  const [openButton, setOpenButton] = useState(false);
  const buttonStyle = {
    width: openButton ? "fit-content" : "3rem",
    height: openButton ? "fit-content" : "3rem",
    borderRadius: openButton ? "0" : "30px",
    alignItems: openButton ? "flex-start" : "center",
  };

  /* Another way to handle the behavior of the filter div
    onMouseEnter={() => setOpenButton(true)}
    onMouseLeave={() => setOpenButton(false)}
  */

  return (
    <button
      className={styles.filterWrapper}
      style={buttonStyle}
      onFocus={() => setOpenButton(true)}
      onBlur={(event) => {
        if (!event?.currentTarget?.contains(event?.relatedTarget))
          setOpenButton(false);
      }}
    >
      {openButton ? (
        <>
          <GenerationTypesFilter {...{ state, dispatch }} />
          <RegionFilter {...{ state, dispatch }} />
          <TypesFilter {...{ state, dispatch }} />
        </>
      ) : (
        <div className={styles.filterWrapper__image}>
          <Image src={FilterIcon} alt="Filter Icon" />
        </div>
      )}
    </button>
  );
};

export default Filter;
