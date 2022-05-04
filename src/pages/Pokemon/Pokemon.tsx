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

  const [game, setGame] = useState("Gioco default");
  const [showMenu, setShowMenu] = useState(false);
  const [topPage, setTopPage] = useState(false);

  useEffect(() => {
    if (topPage) {
      window.scrollTo(0, 0);
      setTopPage(!topPage);
    }
  }, [topPage]);

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

  const color = ColorType[data.types[0].type.name];

  return (
    <>
      <div className={styles.navBar} style={{ backgroundColor: color }}>
        <span className={styles.navBar__backHomepage}>&lt;</span>
        <span className={styles.navBar__currentPokemonName}>{data.name}</span>
        <span className={styles.navBar__currentPokemonNumber}>#{data.id}</span>
      </div>
      <div className={styles.baseInfo}>
        <div className={styles.baseInfo__grid}>
          <div className={styles.baseInfo__grid__column}>
            <div className={styles.typeAbilityBox}>
              <div>Type</div>
              <div>Ability</div>
            </div>
            <div>
              <div className={styles.typeVarBox}>
                {data.types.map((type: TypesType) => {
                  return (
                    <span
                      className={styles.typeVarBox__each}
                      style={{
                        backgroundColor: ColorType[type.type.name],
                      }}
                    >
                      {type.type.name}{" "}
                    </span>
                  );
                })}
              </div>
              <div className={styles.abilityVarBox}>
                {data.abilities.map((ability: AbilitiesType) => {
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
            </div>
          </div>
          <div className={styles.baseInfo__grid__column}>
            <div className={styles.weightHeightBox}>
              <div>Weight</div>
              <div>Height</div>
            </div>
            <div className={styles.weightHeightVarBox} style={{ color: color }}>
              <div>{data.weight} kg</div>
              <div>{(data.height * 0.1).toFixed(1)} m</div>
            </div>
          </div>
        </div>
        <div className={styles.baseInfo__description}>
          <div className={styles.baseInfo__description__image}>
            <Image
              src={
                data.id < 808
                  ? data.sprites.other["official-artwork"].front_default
                  : ImageErrorUrl
              }
              alt="official-artwork"
              loading="lazy"
              width="300px"
              height="300px"
            />
          </div>

          <div>Desctiption</div>
        </div>
      </div>
      <div className={styles.evolutions}>
        <div>Evolution chain</div>
        <div className={styles.evolutions__images}>
          <div className={styles.evolutions__images__singleImage}>Images</div>
          <div className={styles.evolutions__images__singleImage}>Images</div>
          <div className={styles.evolutions__images__singleImage}>Images</div>
        </div>
      </div>
      <div className={styles.specie}>Info Specie - scroll area</div>
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
                  setGame("gioco 1");
                  setShowMenu(!showMenu);
                }}
              >
                gioco 1
              </li>
              <li onClick={() => setGame("gioco 2")}>gioco 2</li>
            </ul>
          </GameMenu>
        </div>
      </div>
    </>
  );
};

export default Pokemon;
