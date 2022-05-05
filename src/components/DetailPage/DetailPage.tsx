import React, { useEffect, useState } from "react";
import { NextPage } from "next/types";
import Image from "next/image";

import ImageErrorUrl from "../../../public/images/image-not-found.svg";
import styles from "./DetailPage.module.scss";

import {
  ColorType,
  TypesType,
  AbilitiesType,
  DataPropsType,
} from "../../helpers/types";

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
            key={type.type.name}
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
          <div
            key={val}
            className={styles.specie__card__value}
            style={{ color: color }}
          >
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

const DetailPage: NextPage<DataPropsType> = (props) => {
  const { data, detail } = props;

  const [topPage, setTopPage] = useState(false);

  const color = ColorType[data.types[0].type.name];

  console.log(detail.flavor_text_entries);

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

export default DetailPage;
