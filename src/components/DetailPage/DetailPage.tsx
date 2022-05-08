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
  return (
    <div className={styles.baseInfo}>
      <div className={styles.baseInfo__grid}>
        <div className={styles.baseInfo__grid__column}>
          <div className={styles.typeAbilityBox}>
            <p>Type</p>
            <p>Ability</p>
          </div>
          <div>
            <PokemonType types={types} />
            <PokemonAbility color={color} abilities={abilities} />
          </div>
        </div>
        <div className={styles.baseInfo__grid__column}>
          <div className={styles.weightHeightBox}>
            <p>Weight</p>
            <p>Height</p>
          </div>
          <div className={styles.weightHeightVarBox}>
            <p>{(weight * 0.1).toFixed(1)} kg</p>
            <p>{(height * 0.1).toFixed(1)} m</p>
          </div>
        </div>
      </div>
      <div className={styles.baseInfo__description}>
        <div className={styles.baseInfo__description__image}>
          <Image
            src={id < 808 ? sprite : PokeBallIcon}
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

const PokemonType = (props: { types: Array<TypesType> }) => {
  const { types } = props;
  return (
    <div className={styles.typeVarBox}>
      {types.map((type: TypesType) => {
        return (
          <div
            key={type.type.name}
            className={styles.typeVarBox__each}
            style={{
              backgroundColor: ColorMapping[type.type.name],
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

const PokemonAbility = (props: {
  color: ColorMapping;
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

const PokemonEvolution = (props: {
  color: ColorMapping;
  name: string;
  image: string;
}) => {
  const { color, name, image } = props;
  return (
    <div className={styles.evolutions}>
      <p className={styles.evolutions__title} style={{ color: color }}>
        Evolution Chain
      </p>
      <div>
        <div className={styles.evolutions__card}>
          <div className={styles.evolutions__card__image}>
            <Image
              src={image}
              alt="search-image"
              loading="lazy"
              layout="fill"
            />
          </div>
          <p
            className={styles.evolutions__card__name}
            style={{ backgroundColor: color }}
          >
            {name}
          </p>
        </div>
      </div>
    </div>
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
    <div className={styles.specie}>
      <p className={styles.specieTitle} style={{ color: color }}>
        Species Data
      </p>
      {ContentSpecies.species.map(
        (current: { id: number; name: string; info: string }, i: number) => {
          const { id, name, info } = current;
          const items = valueSpecies[i];
          return <Card key={id} {...{ color, name, info, items }} />;
        }
      )}
    </div>
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

const Footer = (props: {
  color: ColorMapping;
  gamesName: Array<{ id: string; name: string; entryNum: number }>;
  setGameNumb: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { color, gamesName, setGameNumb } = props;

  const [game, setGame] = useState("Pokemon Shield");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.footer}>
      <div className={styles.footer__btns}>
        <button
          className={styles.footer__btns__topBtn}
          style={{ backgroundColor: color }}
          onClick={() =>
            window &&
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
        >
          <Image src={ArrowUpIcon} alt="go up" width={24} height={24} />
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
    <div onClick={() => setShowMenu(!showMenu)}>
      Select Game: {game}
      {showMenu && children}
    </div>
  );
};

const DetailPage: NextPage<DetailPagePropsType> = (props) => {
  const { data, detail } = props;
  const [gameNumb, setGameNumb] = useState(91);
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
            !detail.flavor_text_entries[gameNumb].flavor_text
              ? detail.flavor_text_entries[0].flavor_text
              : detail.flavor_text_entries[gameNumb].flavor_text
          }
        />
        <PokemonEvolution
          color={color}
          name={data.name}
          image={data.sprites.other["official-artwork"].front_default}
        />
        <PokemonDetail {...{ color, detail }} />
      </Main>
      <Footer
        color={color}
        gamesName={gamesName.games}
        setGameNumb={setGameNumb}
      />
    </>
  );
};

export default DetailPage;
