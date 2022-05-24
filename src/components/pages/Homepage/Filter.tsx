import React, { useContext } from "react";
import {
  GenerationTypeFilterContext,
  RegionFilterContext,
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
            defaultChecked
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
          />
          1
        </label>
      </div>
    </div>
  );
};

const RegionFilter = () => {
  const context = useContext(RegionFilterContext);

  const regions = [
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
                  const target = event.target as HTMLInputElement;
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
                defaultChecked
              />
              {region.name}
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
    </div>
  );
};

export default Filter;
