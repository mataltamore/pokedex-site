import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import styles from "./Pokemon.module.scss";
import ImageErrorUrl from "../../../public/images/image-not-found.svg";
import backHomeImage from "../../../public/images/back-arrow-icon.svg";
import { Value } from "sass";
import { ADDRGETNETWORKPARAMS } from "dns";

type DataPropsType = {
  data: {
    abilities: AbilitiesType[];
    forms: FormsType[];
    game_indices: GameIndicesType[];
    height: number;
    id: number;
    location_area_encounters: string;
    name: string;
    past_types: PastTypes[];
    species: SpeciesType;
    sprites: SpritesType;
    stats: StatTypes[];
    types: TypesType[];
    weight: number;
  };
};

type AbilitiesType = {
  ability: {
    name: string;
  };
  is_hidden: boolean;
  slot: number;
};

type FormsType = {
  name: string;
  url: string;
};

type GameIndicesType = {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
};

type PastTypes = {
  generation: {
    name: string;
    url: string;
  };
  types: {
    slot: 1;
    type: {
      name: string;
      url: string;
    };
  };
};

type SpeciesType = {
  name: string;
  url: string;
};

type SpritesType = {
  other: {
    dream_world: {
      front_default: string;
      front_female: string;
    };
    home: {
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
    "official-artwork": {
      front_default: string;
    };
  };
};

type StatTypes = {
  base_stat: number;
  stat: {
    name: string;
  };
};

type TypesType = {
  slot: number;
  type: {
    name:
      | "normal"
      | "fire"
      | "fighting"
      | "water"
      | "flying"
      | "grass"
      | "poison"
      | "electric"
      | "ground"
      | "psychic"
      | "rock"
      | "ice"
      | "bug"
      | "dragon"
      | "ghost"
      | "dark"
      | "steel"
      | "fairy";
    url: string;
  };
};

enum ColorType {
  normal = "rgb(168, 168, 120)",
  fire = "rgb(240, 128, 48)",
  fighting = "rgb(192, 48, 40)",
  water = "rgb(104, 144, 240)",
  flying = "rgb(168, 144, 240)",
  grass = "rgb(120, 200, 80)",
  poison = "rgb(160, 64, 160)",
  electric = "rgb(248, 208, 48)",
  ground = "rgb(224, 192, 104)",
  psychic = "rgb(248, 88, 136)",
  rock = "rgb(184, 160, 56)",
  ice = "rgb(152, 216, 216)",
  bug = "rgb(168, 184, 32)",
  dragon = "rgb(112, 56, 248)",
  ghost = "rgb(112, 88, 152)",
  dark = "rgb(112, 88, 72)",
  steel = "rgb(184, 184, 208)",
  fairy = "rgb(238, 153, 172)",
}

const NavBar = (props: { color: ColorType; name: string; id: number }) => {
  const { color, name, id } = props;
  return (
    <div className={styles.navBar} style={{ backgroundColor: color }}>
      <span className={styles.navBar__backHomepage}>&lt;</span>
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
          <span
            className={styles.typeVarBox__each}
            style={{
              backgroundColor: ColorType[type.type.name],
            }}
          >
            {type.type.name}
          </span>
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
}) => {
  const { color, types, abilities, weight, height, id, sprite } = props;
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
          <div className={styles.weightHeightVarBox} style={{ color: color }}>
            <div>{weight} kg</div>
            <div>{(height * 0.1).toFixed(1)} m</div>
          </div>
        </div>
      </div>
      <div className={styles.baseInfo__description}>
        <div className={styles.baseInfo__description__image}>
          <Image
            src={id < 808 ? sprite : ImageErrorUrl}
            alt="official-artwork"
            loading="lazy"
            width="300px"
            height="300px"
          />
        </div>

        <div>Desctiption</div>
      </div>
    </div>
  );
};

const EvolutionChain = () => {
  return (
    <div className={styles.evolutions}>
      <div>Evolution chain</div>
      <div className={styles.evolutions__images}>
        <div className={styles.evolutions__images__singleImage}>Images</div>
        <div className={styles.evolutions__images__singleImage}>Images</div>
        <div className={styles.evolutions__images__singleImage}>Images</div>
      </div>
    </div>
  );
};

const Footer = (props: {
  color: ColorType;
  topPage: boolean;
  setTopPage: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { color, topPage, setTopPage } = props;

  const [game, setGame] = useState("game_default");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.footer}>
      <div className={styles.footer__btns}>
        <button
          className={styles.footer__btns__backBtn}
          style={{ backgroundColor: color }}
        >
          Back btn
        </button>

        <button
          className={styles.footer__btns__topBtn}
          style={{ backgroundColor: color }}
          onClick={() => setTopPage(!topPage)}
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
            <li
              onClick={() => {
                setGame("game1");
                setShowMenu(!showMenu);
              }}
            >
              game1
            </li>
            <li onClick={() => setGame("game2")}>game2</li>
            <li onClick={() => setGame("game_default")}>game2</li>
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
    <>
      <div onClick={() => setShowMenu(!showMenu)}>
        Select Game: {game}
        {showMenu && <>{children}</>}
      </div>
    </>
  );
};

const Pokemon: NextPage<DataPropsType> = (props) => {
  const { data } = props;

  const [topPage, setTopPage] = useState(false);

  const color = ColorType[data.types[0].type.name];

  useEffect(() => {
    if (topPage) {
      window.scrollTo(0, 0);
      setTopPage(!topPage);
    }
  }, [topPage]);

  return (
    <>
      <NavBar color={color} name={data.name} id={data.id} />
      <BaseInfo
        color={color}
        types={data.types}
        abilities={data.abilities}
        weight={data.weight}
        height={data.height}
        id={data.id}
        sprite={data.sprites.other["official-artwork"].front_default}
      />

      <EvolutionChain />
      <div className={styles.specie}>Info Specie - scroll area</div>

      <Footer color={color} topPage={topPage} setTopPage={setTopPage} />
    </>
  );
};

export default Pokemon;
