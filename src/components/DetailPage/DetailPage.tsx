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
} from "../../helpers/types";

import gamesName from "../../../public/api/games-name.json";

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
            <div>Type</div>
            <div>Ability</div>
          </div>
          <div>
            <TypeVarBox types={types} />
            <AbilityVarBox color={color} abilities={abilities} />
          </div>
        </div>
        <div className={styles.baseInfo__grid__column}>
          <div className={styles.weightHeightBox}>
            <div>Weight</div>
            <div>Height</div>
          </div>
          <div className={styles.weightHeightVarBox}>
            <div>{weight} kg</div>
            <div>{(height * 0.1).toFixed(1)} m</div>
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
          <div className={styles.baseInfo__description__container__title}>
            Description
          </div>
          <div className={styles.baseInfo__description__container__text}>
            {description}
          </div>
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
      <div
        className={styles.evolutions__card__name}
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </div>
  );
};

const SpecieNumber = (props: {
  color: ColorType;
  name: string;
  info: string;
  value: number;
}) => {
  const { color, name, info, value } = props;
  return (
    <div className={styles.specie__card}>
      <div className={styles.specie__card__name}>{name}</div>
      <div className={styles.specie__card__info}>{info}</div>
      <div className={styles.specie__card__value} style={{ color: color }}>
        {value}
      </div>
    </div>
  );
};

const SpecieString = (props: {
  color: ColorType;
  name: string;
  info: string;
  value1: string;
  value2: string;
}) => {
  const { color, name, info, value1, value2 } = props;
  return (
    <div className={styles.specie__card}>
      <div className={styles.specie__card__name}>{name}</div>
      <div className={styles.specie__card__info}>{info}</div>
      <div className={styles.specie__card__value} style={{ color: color }}>
        {value1} {value2}
      </div>
    </div>
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
    <div onClick={() => setShowMenu(!showMenu)}>
      Select Game: {game}
      {showMenu && children}
    </div>
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
        <div className={styles.evolutions__title} style={{ color: color }}>
          Evolution Chain
        </div>
        <div>
          <EvolutionCard
            color={color}
            name={data.name}
            image={data.sprites.other["official-artwork"].front_default}
          />
        </div>
      </div>

      <div>
        <div className={styles.specieTitle} style={{ color: color }}>
          Species Data
        </div>
        <div className={styles.specie}>
          <SpecieNumber
            color={color}
            name="Base Happiness"
            info="The happiness when caught by a normal Pokéball; up to 255."
            value={detail.base_happiness}
          />
          <SpecieString
            color={color}
            name="Egg Group"
            info="A list of egg groups this species is a member of."
            value1={detail.egg_groups[0].name}
            value2={
              detail.egg_groups.length === 1 ? "" : detail.egg_groups[1].name
            }
          />
          <SpecieString
            color={color}
            name="Habitat"
            info="The habitat this species can be encountered in a game."
            value1={
              detail.habitat.name === "null" ? detail.habitat.name : "unknown"
            }
            value2={""}
          />
          <SpecieString
            color={color}
            name="Shape"
            info="The shape of this Pokémon for Pokédex search."
            value1={detail.shape.name}
            value2={""}
          />
          <SpecieNumber
            color={color}
            name="Capture Rate"
            info="The higher the number, the easier the catch (upto 255)."
            value={detail.capture_rate}
          />
          <SpecieString
            color={color}
            name="Generation"
            info="The generation this Pokémon species was introduced in."
            value1={detail.generation.name.substring(11).toUpperCase()}
            value2=""
          />
        </div>
      </div>

      <Footer
        color={color}
        gamesName={gamesName.games}
        setGameNumb={setGameNumb}
      />
    </div>
  );
};

export default DetailPage;
