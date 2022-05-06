import React, { useState } from "react";
import { NextPage } from "next/types";
import Image from "next/image";
import Link from "next/link";

import pokeball from "../../../public/images/pokeball.svg";
import styles from "./DetailPage.module.scss";

import {
  ColorType,
  TypesType,
  AbilitiesType,
  DataPropsType,
  DetailType,
} from "../../helpers/types";

import gamesName from "../../../public/api/games-name.json";
import ContentSpecies from "../../../public/api/content-species.json";

import normalIcon from "../../../public/images/normal.svg";
import bugIcon from "../../../public/images/bug.svg";
import darkIcon from "../../../public/images/dark.svg";
import dragonIcon from "../../../public/images/dragon.svg";
import electricIcon from "../../../public/images/electric.svg";
import fairyIcon from "../../../public/images/fairy.svg";
import fightingIcon from "../../../public/images/fighting.svg";
import fireIcon from "../../../public/images/fire.svg";
import flyingIcon from "../../../public/images/flying.svg";
import ghostIcon from "../../../public/images/ghost.svg";
import grassIcon from "../../../public/images/grass.svg";
import groundIcon from "../../../public/images/ground.svg";
import iceIcon from "../../../public/images/ice.svg";
import poisonIcon from "../../../public/images/poison.svg";
import psychicIcon from "../../../public/images/psychic.svg";
import rockIcon from "../../../public/images/rock.svg";
import steelIcon from "../../../public/images/steel.svg";
import waterIcon from "../../../public/images/water.svg";

const IconMapping = {
  normal: normalIcon,
  fire: fireIcon,
  fighting: fightingIcon,
  water: waterIcon,
  flying: flyingIcon,
  grass: grassIcon,
  poison: poisonIcon,
  electric: electricIcon,
  ground: groundIcon,
  psychic: psychicIcon,
  rock: rockIcon,
  ice: iceIcon,
  bug: bugIcon,
  dragon: dragonIcon,
  ghost: ghostIcon,
  dark: darkIcon,
  steel: steelIcon,
  fairy: fairyIcon,
};

const NavBar = (props: { color: ColorType; name: string; id: number }) => {
  const { color, name, id } = props;

  return (
    <div className={styles.navBar} style={{ backgroundColor: color }}>
      <span className={styles.navBar__backHomepage}>
        <Link href="/">&lt;</Link>
      </span>
      <span className={styles.navBar__currentPokemonName}>{name}</span>
      <span className={styles.navBar__currentPokemonNumber}>#{id}</span>
    </div>
  );
};

const TypeVarBox = (props: { types: Array<TypesType> }) => {
  const { types } = props;
  return (
    <div className={styles.typeVarBox}>
      {types.map((type: TypesType) => {
        return (
          <div
            key={type.type.name}
            className={styles.typeVarBox__each}
            style={{
              backgroundColor: ColorType[type.type.name],
            }}
          >
            <div className={styles.typeVarBox__each__image}>
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

const AbilityVarBox = (props: {
  color: ColorType;
  abilities: Array<AbilitiesType>;
}) => {
  const { color, abilities } = props;
  return (
    <div className={styles.abilityVarBox}>
      {abilities.map((ability: AbilitiesType) => {
        return (
          <span
            key={ability.ability.name}
            className={styles.abilityVarBox__each}
            style={{ backgroundColor: color }}
          >
            {ability.ability.name}
          </span>
        );
      })}
    </div>
  );
};

const BaseInfo = (props: {
  color: ColorType;
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
  return (
    <div className={styles.baseInfo}>
      <div className={styles.baseInfo__grid}>
        <div className={styles.baseInfo__grid__column}>
          <div className={styles.typeAbilityBox}>
            <p>Type</p>
            <p>Ability</p>
          </div>
          <div>
            <TypeVarBox types={types} />
            <AbilityVarBox color={color} abilities={abilities} />
          </div>
        </div>
        <div className={styles.baseInfo__grid__column}>
          <div className={styles.weightHeightBox}>
            <p>Weight</p>
            <p>Height</p>
          </div>
          <div className={styles.weightHeightVarBox}>
            <p>{weight} kg</p>
            <p>{(height * 0.1).toFixed(1)} m</p>
          </div>
        </div>
      </div>
      <div className={styles.baseInfo__description}>
        <div className={styles.baseInfo__description__image}>
          <Image
            src={id < 808 ? sprite : pokeball}
            alt="official-artwork"
            loading="lazy"
            layout="fill"
          />
        </div>

        <div className={styles.baseInfo__description__container}>
          <p className={styles.baseInfo__description__container__title}>
            Description
          </p>
          <p className={styles.baseInfo__description__container__text}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const EvolutionCard = (props: {
  color: ColorType;
  name: string;
  image: string;
}) => {
  const { color, name, image } = props;
  return (
    <div className={styles.evolutions__card}>
      <div className={styles.evolutions__card__image}>
        <Image src={image} alt="search-image" loading="lazy" layout="fill" />
      </div>
      <p
        className={styles.evolutions__card__name}
        style={{ backgroundColor: color }}
      >
        {name}
      </p>
    </div>
  );
};

const SpecieCard = (props: {
  color: ColorType;
  name: string;
  info: string;
  items: Array<string>;
}) => {
  const { color, name, info, items } = props;
  return (
    <div className={styles.specie__card}>
      <p className={styles.specie__card__name}>{name}</p>
      <p className={styles.specie__card__info}>{info}</p>
      <p className={styles.specie__card__value} style={{ color: color }}>
        {items.map((item) => {
          return item.concat(" ");
        })}
      </p>
    </div>
  );
};

const SpecieCards = (props: { color: ColorType; detail: DetailType }) => {
  const { color, detail } = props;

  const valueSpecies = [
    [detail.base_happiness.toString()],
    [
      detail.egg_groups[0].name,
      detail.egg_groups.length === 1 ? "" : detail.egg_groups[1].name,
    ],
    [detail.habitat.name === "null" ? detail.habitat.name : "unknown"],
    [detail.shape.name],
    [detail.generation.name.substring(11).toUpperCase()],
    [detail.capture_rate.toString()],
  ];

  return (
    <>
      <p className={styles.specieTitle} style={{ color: color }}>
        Species Data
      </p>
      <p className={styles.specie}>
        {ContentSpecies.species.map(
          (current: { id: number; name: string; info: string }, i: number) => {
            const { id, name, info } = current;
            const items = valueSpecies[i];
            return <SpecieCard key={id} {...{ color, name, info, items }} />;
          }
        )}
      </p>
    </>
  );
};

const Footer = (props: {
  color: ColorType;
  gamesName: Array<{ id: string; name: string; entryNum: number }>;
  setGameNumb: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { color, gamesName, setGameNumb } = props;

  const [game, setGame] = useState("Pokemon Shield");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.footer}>
      <div className={styles.footer__btns}>
        <div
          className={styles.footer__btns__backBtn}
          style={{ backgroundColor: color }}
        >
          <Link href="/">Back to HomePage</Link>
        </div>

        <button
          className={styles.footer__btns__topBtn}
          style={{ backgroundColor: color }}
          onClick={() => typeof window !== "undefined" && window.scrollTo(0, 0)}
        >
          Top btn
        </button>
      </div>

      <div
        className={styles.footer__changeGame}
        style={{ backgroundColor: color }}
      >
        <GameMenu game={game} showMenu={showMenu} setShowMenu={setShowMenu}>
          <ul
            className={styles.footer__changeGame__list}
            style={{ backgroundColor: color }}
          >
            {gamesName.map((gameName) => {
              return (
                <li
                  key={gameName.id}
                  onClick={() => {
                    setGame(gameName.name);
                    setShowMenu(!showMenu);
                    setGameNumb(gameName.entryNum);
                  }}
                >
                  {gameName.name}
                </li>
              );
            })}
          </ul>
        </GameMenu>
      </div>
    </div>
  );
};

const GameMenu = (props: {
  game: string;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
}) => {
  const { game, showMenu, setShowMenu, children } = props;

  return (
    <p onClick={() => setShowMenu(!showMenu)}>
      Select Game: {game}
      {showMenu && children}
    </p>
  );
};

const DetailPage: NextPage<DataPropsType> = (props) => {
  const { data, detail } = props;

  const [gameNumb, setGameNumb] = useState(91);

  const color = ColorType[data.types[0].type.name];

  return (
    <div>
      <NavBar color={color} name={data.name} id={data.id} />

      <BaseInfo
        color={color}
        types={data.types}
        abilities={data.abilities}
        weight={data.weight}
        height={data.height}
        id={data.id}
        sprite={data.sprites.other["official-artwork"].front_default}
        description={
          typeof detail.flavor_text_entries[gameNumb].flavor_text ===
          "undefined"
            ? detail.flavor_text_entries[0].flavor_text
            : detail.flavor_text_entries[gameNumb].flavor_text
        }
      />

      <div className={styles.evolutions}>
        <p className={styles.evolutions__title} style={{ color: color }}>
          Evolution Chain
        </p>
        <div>
          <EvolutionCard
            color={color}
            name={data.name}
            image={data.sprites.other["official-artwork"].front_default}
          />
        </div>
      </div>

      <SpecieCards {...{ color, detail }} />

      <Footer
        color={color}
        gamesName={gamesName.games}
        setGameNumb={setGameNumb}
      />
    </div>
  );
};

export default DetailPage;
