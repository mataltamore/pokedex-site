import React from "react";
import { NextPage } from "next/types";
import Image from "next/image";

import ArrowUpIcon from "/public/images/arrow-up-icon.svg";
import styles from "./DetailPage.module.scss";

import { PokeAPI, PokeSpecieAPI } from "../../../globals/types";

import { PokemonTypeMapping } from "../../../globals/utils";

import NavBar from "./NavBar";
import PrimaryInformation from "./PrimaryInformation";
import SecondaryInformation from "./SecondaryInformation";
import PokemonEvolution from "./PokemonEvolution";

type DetailPageProps = {
  data: PokeAPI;
  detail: PokeSpecieAPI;
};

type FooterDetailProps = {
  color: string;
};

const Footer = ({ color }: FooterDetailProps) => {
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

const DetailPage: NextPage<DetailPageProps> = (props) => {
  const { data, detail } = props;
  const { types, abilities, weight, height, id, name } = data;

  const color = PokemonTypeMapping[data.types[0].type.name].color;
  const secondColor = PokemonTypeMapping[data.types[1]?.type.name]?.color;
  const PrimaryInformationProps = {
    color,
    types,
    abilities,
    weight,
    height,
    id,
    sprite: data.sprites.other["official-artwork"].front_default,
    description: !detail.flavor_text_entries[0]?.flavor_text
      ? detail.flavor_text_entries[0]?.flavor_text
      : detail.flavor_text_entries[0]?.flavor_text,
  };
  const PokemonEvolutionProps = {
    color,
    name,
    image: data.sprites.other["official-artwork"].front_default,
  };

  return (
    <>
      <NavBar
        color={color}
        secondColor={secondColor}
        name={data.name}
        id={data.id}
      />
      <div className={styles.defaultLayout}>
        <PrimaryInformation {...PrimaryInformationProps} />
        <PokemonEvolution {...PokemonEvolutionProps} />
        <SecondaryInformation {...{ color, detail }} />
      </div>
      <Footer color={color} />
    </>
  );
};

export default DetailPage;
