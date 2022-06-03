import React, { useContext, useState } from "react";
import Image from "next/image";
import {
  GenerationTypeFilterContext,
  RegionFilterContext,
  PokemonTypeContext,
} from "../../helpers/context";
import { GenerationNumber } from "../../../globals/types";
import FilterIcon from "../../../../public/images/filter-icon.svg";
import styles from "./Homepage.module.scss";

const GenerationTypesFilter = () => {
  const context = useContext(GenerationTypeFilterContext);

  const isChecked = (radioValue: number) => context?.value === radioValue;

  return (
    <div className={styles.generationTypesFilter}>
      <legend>Select types by generation:</legend>
      <div>
        <label>
          <input
            type="radio"
            name="genTypes"
            value="6"
            onClick={() => context?.setValue(6)}
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
            onClick={() => context?.setValue(5)}
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
            onClick={() => context?.setValue(1)}
            defaultChecked={isChecked(1)}
          />
          1
        </label>
      </div>
    </div>
  );
};

const RegionFilter = () => {
  const context = useContext(RegionFilterContext);

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
    context?.value.includes(regionNumber);

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
                  if (target.checked)
                    context?.setValue((prev: Array<GenerationNumber>) => [
                      ...prev,
                      region.number,
                    ]);
                  else
                    context?.setValue((prev: Array<GenerationNumber>) =>
                      prev.filter(
                        (item: GenerationNumber) => item !== region.number
                      )
                    );
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

const TypesFilter = () => {
  const context = useContext(PokemonTypeContext);

  const pokemonTypes: Array<string> = [
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
  ];

  const isChecked = (pokemonType: string) =>
    context?.value.includes(pokemonType);

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
                  if (target.checked)
                    context?.setValue((prev: Array<string>) => [
                      ...prev,
                      pokemonType,
                    ]);
                  else
                    context?.setValue((prev: Array<string>) =>
                      prev.filter((item: string) => item !== pokemonType)
                    );
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
          <GenerationTypesFilter />
          <RegionFilter />
          <TypesFilter />
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
