import React, { useState } from "react";
import { NextPage } from "next/types";
import Image from "next/image";
import Link from "next/link";

import PokeBallIcon from "../../../public/images/pokeball.svg";
import ArrowBackIcon from "../../../public/images/arrow-back-icon.svg";
import ArrowUpIcon from "../../../public/images/arrow-up-icon.svg";
import styles from "./DetailPage.module.scss";

import {
  TypesType,
  AbilitiesType,
  DetailPagePropsType,
  DetailType,
  RomanNumbersType,
  ArrayChildrenProp,
} from "../../helpers/types";

import {
  ColorMapping,
  IconMapping,
  RomanLetterMapping,
} from "../../helpers/utils";

import gamesName from "../../../public/api/games-name.json";
import ContentSpecies from "../../../public/api/content-species.json";

const NavBar = (props: { color: ColorMapping; name: string; id: number }) => {
  const { color, name, id } = props;

  return (
    <nav className={styles.navbar} style={{ backgroundColor: color }}>
      <Link href="/" passHref>
        <div className={styles.navbar__backbutton}>
          <Image src={ArrowBackIcon} alt="back arrow" layout="fill" />
        </div>
      </Link>
      <h1 className={styles.navbar__name}>{name}</h1>
      <span className={styles.navbar__number}>
        <p>Number</p>
        {id}
      </span>
    </nav>
  );
};

const Main = (props: ArrayChildrenProp) => {
  const { children } = props;
  return <div className={styles.defaultLayout}>{children}</div>;
};

const PrimaryInformation = (props: {
  color: ColorMapping;
  types: Array<TypesType>;
  abilities: Array<AbilitiesType>;
  weight: number;
  height: number;
  id: number;
  sprite: string;
  description: string;
}) => {
  const { color, types, abilities, weight, height, id, sprite, description } =
    props;
  const weightConverted = (weight * 0.1).toFixed(1);
  const heightConverted = (height * 0.1).toFixed(1);
  const weightUnit = "kg";
  const heightUnit = "m";

  return (
    <div className={styles.mainContentWrapper}>
      <div className={styles.basicInformation}>
        <div className={styles.column}>
          <div className={styles.column__abilities}>
            <p>Type</p>
            <p>Ability</p>
          </div>
          <div>
            <PokemonType types={types} />
            <PokemonAbility color={color} abilities={abilities} />
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.column__size}>
            <p>Weight</p>
            <p>Height</p>
          </div>
          <div className={styles.column__sizeData}>
            <p>
              {weightConverted} {weightUnit}
            </p>
            <p>
              {heightConverted} {heightUnit}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.mainImage}>
        <div className={styles.titleImage}>
          <Image
            src={id < 808 ? sprite : PokeBallIcon}
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

const PokemonType = (props: { types: Array<TypesType> }) => {
  const { types } = props;
  return (
    <div className={styles.typesWrapper}>
      {types.map((type: TypesType) => {
        return (
          <div
            key={type.type.name}
            className={styles.typeLabel}
            style={{
              backgroundColor: ColorMapping[type.type.name],
            }}
          >
            <div className={styles.typeLabel__image}>
              <Image
                src={IconMapping[type.type.name]}
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

const PokemonAbility = (props: {
  color: ColorMapping;
  abilities: Array<AbilitiesType>;
}) => {
  const { color, abilities } = props;
  return (
    <div className={styles.abilitiesWrapper}>
      {abilities.map((ability: AbilitiesType) => {
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

const PokemonEvolution = (props: {
  color: ColorMapping;
  name: string;
  image: string;
}) => {
  const { color, name, image } = props;
  return (
    <section className={styles.evolutionsWrapper}>
      <h2 className={styles.evolutionsWrapper__title} style={{ color: color }}>
        Evolution Chain
      </h2>
      <div>
        <div className={styles.evolutionCard}>
          <div className={styles.evolutionCard__image}>
            <Image
              src={image}
              alt="search-image"
              loading="lazy"
              layout="fill"
            />
          </div>
          <p
            className={styles.evolutionCard__name}
            style={{ backgroundColor: color }}
          >
            {name}
          </p>
        </div>
      </div>
    </section>
  );
};

const PokemonDetail = (props: { color: ColorMapping; detail: DetailType }) => {
  const { color, detail } = props;

  const romanNumber: RomanNumbersType = detail.generation.name
    .substring(11)
    .toUpperCase() as RomanNumbersType;
  const generationNumber: string = RomanLetterMapping[romanNumber];

  const valueSpecies = [
    [detail.base_happiness.toString()],
    [
      detail.egg_groups[0].name,
      detail.egg_groups.length === 1 ? "" : detail.egg_groups[1].name,
    ],
    [detail.habitat.name === "null" ? detail.habitat.name : "unknown"],
    [detail.shape.name],
    [generationNumber],
    [detail.capture_rate.toString()],
  ];

  return (
    <section className={styles.detailWrapper}>
      <h2 className={styles.detailWrapper__title} style={{ color: color }}>
        Species Data
      </h2>
      <div className={styles.detailWrapper__body}>
        {ContentSpecies.species.map(
          (current: { id: number; name: string; info: string }, i: number) => {
            const { id, name, info } = current;
            const items = valueSpecies[i];
            return <Card key={id} {...{ color, name, info, items }} />;
          }
        )}
      </div>
    </section>
  );
};

const Card = (props: {
  color: ColorMapping;
  name: string;
  info: string;
  items: Array<string>;
}) => {
  const { color, name, info, items } = props;
  return (
    <div className={styles.detailCard}>
      <p className={styles.detailCard__name}>{name}</p>
      <p className={styles.detailCard__info}>{info}</p>
      <p className={styles.detailCard__value} style={{ color: color }}>
        {items.map((item) => {
          return item.concat(" ");
        })}
      </p>
    </div>
  );
};

const Footer = (props: {
  color: ColorMapping;
  gamesName: Array<{ id: string; name: string; entryNum: number }>;
}) => {
  const { color } = props;

  const scrollOptions: ScrollToOptions = {
    top: 0,
    left: 0,
    behavior: "smooth",
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.scroll}>
        <button
          type="button"
          className={styles.scroll__btn}
          style={{ backgroundColor: color }}
          onClick={() => window && window.scrollTo(scrollOptions)}
        >
          <div className={styles.scroll__image}>
            <Image src={ArrowUpIcon} alt="go up" layout="fill" />
          </div>
        </button>
      </div>
    </footer>
  );
};

const DetailPage: NextPage<DetailPagePropsType> = (props) => {
  const { data, detail } = props;
  const color = ColorMapping[data.types[0].type.name];

  return (
    <>
      <NavBar color={color} name={data.name} id={data.id} />
      <Main>
        <PrimaryInformation
          color={color}
          types={data.types}
          abilities={data.abilities}
          weight={data.weight}
          height={data.height}
          id={data.id}
          sprite={data.sprites.other["official-artwork"].front_default}
          description={
            !detail.flavor_text_entries[0]?.flavor_text
              ? detail.flavor_text_entries[0]?.flavor_text
              : detail.flavor_text_entries[0]?.flavor_text
          }
        />
        <PokemonEvolution
          color={color}
          name={data.name}
          image={data.sprites.other["official-artwork"].front_default}
        />
        <PokemonDetail {...{ color, detail }} />
      </Main>
      <Footer color={color} gamesName={gamesName.games} />
    </>
  );
};

export default DetailPage;
