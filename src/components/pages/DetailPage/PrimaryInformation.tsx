import React from "react";
import Image from "next/image";

import { SHIFT_UNIT } from "../../../globals/constants";
import styles from "./DetailPage.module.scss";

import { PokemonTypeMapping } from "../../../globals/utils";
import { PokemonType, Ability } from "../../../globals/types";

type PrimaryInformationProps = {
  color: string;
  types: Array<PokemonType>;
  abilities: Array<Ability>;
  weight: number;
  height: number;
  id: number;
  sprite: string;
  description: string;
};

type PokemonAbilityProps = {
  color: string;
  abilities: Array<Ability>;
};

type PokemonTypesProps = {
  types: Array<PokemonType>;
};

const PokemonTypes = ({ types }: PokemonTypesProps) => {
  return (
    <div className={styles.typesWrapper}>
      {types.map((type: PokemonType) => {
        return (
          <div
            key={type.type.name}
            className={styles.typeLabel}
            style={{
              backgroundColor: PokemonTypeMapping[type.type.name].color,
            }}
          >
            <div className={styles.typeLabel__image}>
              <Image
                src={PokemonTypeMapping[type.type.name].icon}
                alt="icon-type"
                loading="lazy"
                layout="fill"
              />
            </div>
            <div>{" " + type.type.name}</div>
          </div>
        );
      })}
    </div>
  );
};

const PokemonAbility = (props: PokemonAbilityProps) => {
  const { color, abilities } = props;
  return (
    <div className={styles.abilitiesWrapper}>
      {abilities.map((ability: Ability) => {
        return (
          <span
            key={ability.ability.name}
            className={styles.abilityLabel}
            style={{ backgroundColor: color }}
          >
            {ability.ability.name}
          </span>
        );
      })}
    </div>
  );
};

const PrimaryInformation = (props: PrimaryInformationProps) => {
  const { color, types, abilities, weight, height, sprite, description } =
    props;
  const weightConverted = (weight * SHIFT_UNIT).toFixed(1);
  const heightConverted = (height * SHIFT_UNIT).toFixed(1);

  return (
    <div className={styles.mainContentWrapper}>
      <div className={styles.basicInformation}>
        <div className={styles.column}>
          <div className={styles.column__abilities}>
            <p>Type</p>
            <p>Ability</p>
          </div>
          <div>
            <PokemonTypes types={types} />
            <PokemonAbility color={color} abilities={abilities} />
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.column__size}>
            <p>Weight</p>
            <p>Height</p>
          </div>
          <div className={styles.column__sizeData}>
            <p>{weightConverted} kg</p>
            <p>{heightConverted} m</p>
          </div>
        </div>
      </div>
      <div className={styles.mainImage}>
        <div className={styles.titleImage}>
          <Image
            src={sprite}
            alt="official-artwork"
            loading="lazy"
            layout="fill"
          />
        </div>
        <div className={styles.descriptionWrapper}>
          <p className={styles.descriptionWrapper__title}>Description</p>
          <p className={styles.descriptionWrapper__body}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PrimaryInformation;
