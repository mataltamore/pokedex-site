import React from "react";

import styles from "./DetailPage.module.scss";

import { RomanLetterMapping } from "../../../globals/utils";
import { PokeSpecieAPI } from "../../../globals/types";

import STATIC_CONTENT from "../../../../public/api/detail-page.json";

type SecondaryInformationProps = { color: string; detail: PokeSpecieAPI };

type CardDetailProps = {
  color: string;
  name: string;
  info: string;
  items: Array<string>;
};

type RomanNumber = "I" | "II" | "III" | "IV" | "V" | "VI" | "VII" | "VIII";

const SecondaryInformation = (props: SecondaryInformationProps) => {
  const { color, detail } = props;

  const INDEX_ROMAN_NUMBER = 11;

  const romanNumber: RomanNumber = detail.generation.name
    .substring(INDEX_ROMAN_NUMBER)
    .toUpperCase() as RomanNumber;
  const generationNumber: string = RomanLetterMapping[romanNumber];

  const valueSpecies = [
    [detail.base_happiness.toString()],
    [detail.egg_groups[0].name, detail.egg_groups[0]?.name],
    [detail.habitat?.name || "unknown"],
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
        {STATIC_CONTENT.details.map(
          (current: { name: string; info: string }, i: number) => {
            const { name, info } = current;
            const items = valueSpecies[i];
            return <Card key={name} {...{ color, name, info, items }} />;
          }
        )}
      </div>
    </section>
  );
};

const Card = (props: CardDetailProps) => {
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

export default SecondaryInformation;
