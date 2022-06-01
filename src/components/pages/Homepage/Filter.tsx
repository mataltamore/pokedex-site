import React, { useContext } from "react";
import {
  GenerationTypeFilterContext,
  RegionFilterContext,
  PokemonTypeContext,
} from "../../helpers/context";
import { GenerationNumber } from "../../../globals/types";
import styles from "./Homepage.module.scss";

const GenerationTypesFilter = () => {
  const context = useContext(GenerationTypeFilterContext);

  return (
    <div className={styles.generationTypesFilter}>
      <legend>Select types by generation:</legend>
      <div>
        <label>
          <input
            type="radio"
            name="genTypes"
            onClick={() => context?.setValue(6)}
            checked={context?.value === 6}
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
            checked={context?.value === 5}
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
            checked={context?.value === 1}
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
                checked={context?.value.includes(region.number)}
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
                checked={context?.value.includes(pokemonType)}
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
  return (
    <div className={styles.filterWrapper}>
      <GenerationTypesFilter />
      <RegionFilter />
      <TypesFilter />
    </div>
  );
};

export default Filter;
