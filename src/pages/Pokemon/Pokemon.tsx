import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import styles from "./Pokemon.module.scss";
import ImageErrorUrl from "../../../public/images/image-not-found.svg";

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
    chain: ChainType;
    base_happiness: number;
    capture_rate: number;
    color: ColorGroupType;
    egg_groups: EggGroupsType[];
    gender_rate: number;
    generation: GenerationType[];
    habitat: HabitatType;
    has_gender_differences: boolean;
    hatch_counter: 20;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    pokedex_numbers: PokedexNumbersType[];
    shape: ShapeType;
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

type ChainType = {
  evolution_details: EvolutionDetailsType[];
  evolves_to: ChainType[];
  is_baby: boolean;
  species: { name: string };
};

type EvolutionDetailsType = {
  gender: string;
  held_item: string;
  item: string;
  known_move: string;
  known_move_type: string;
  location: string;
  min_affection: number;
  min_beauty: number;
  min_happiness: number;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: string; //not sure
  party_type: string;
  relative_physical_stats: string;
  time_of_day: string;
  trade_species: string;
  trigger: {
    name: string;
  };
  turn_upside_down: boolean;
};

type ColorGroupType = {
  name: string;
};

type EggGroupsType = {
  name: string;
};

type GenerationType = {
  name: string;
};

type HabitatType = {
  name: string;
};

type PokedexNumbersType = {
  entry_number: NumberConstructor;
  pokedex: {
    name: string;
  };
};

type ShapeType = {
  name: string;
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
          <div className={styles.weightHeightVarBox}>
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

const EvolutionCard = (props: {
  color: ColorType;
  name: string;
  image: string;
}) => {
  const { color, name, image } = props;
  return (
    <div className={styles.evolutions__card}>
      <div>
        <Image
          src={image}
          alt="search-image"
          loading="lazy"
          width="150px"
          height="150px"
        />
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
  value: Array<string>;
}) => {
  const { color, name, info, value } = props;
  return (
    <div className={styles.specie__card}>
      <div className={styles.specie__card__name}>{name}</div>
      <div className={styles.specie__card__info}>{info}</div>
      {value.map((val) => {
        return (
          <div className={styles.specie__card__value} style={{ color: color }}>
            {val}
          </div>
        );
      })}
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
          {" "}
          Species Data{" "}
        </div>
        <div className={styles.specie}>
          <SpecieNumber
            color={color}
            name="Base Happiness"
            info="The happiness when caught by a normal Pokéball; up to 255."
            value={data.base_happiness}
          />

          <SpecieNumber
            color={color}
            name="Capture Rate"
            info="The higher the number, the easier the catch (upto 255)."
            value={data.capture_rate}
          />
        </div>
      </div>

      <Footer color={color} topPage={topPage} setTopPage={setTopPage} />
    </div>
  );
};

export default Pokemon;
