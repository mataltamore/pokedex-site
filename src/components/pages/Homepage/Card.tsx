import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import { PokemonTypeMapping } from "../../../globals/utils";
import { StaticPokeAPI, PokemonType } from "../../../globals/types";
import { GenerationTypeFilterContext } from "../../helpers/context";

import styles from "./Homepage.module.scss";

const Card = (props: StaticPokeAPI) => {
  const { id, name, types, past_types: pastTypes, sprites } = props;
  const context = useContext(GenerationTypeFilterContext);

  const generationNumberMapping = {
    "generation-i": 1,
    "generation-v": 5,
  };

  const displayNewTypes =
    pastTypes.length === 0 ||
    (context?.value || 6) >
      generationNumberMapping[pastTypes[0].generation.name];

  return (
    <Link href={`/pokemon/${name}?id=${id}`} passHref>
      <article className={styles.card}>
        <h2 className={styles.card__number}>
          <span style={{ fontSize: "0.875rem" }}>#</span>
          {id}
        </h2>
        <div className={styles.card__image}>
          <Image
            src={sprites.official}
            alt={name}
            layout="fill"
            loading="lazy"
          />
        </div>
        <h2 className={styles.card__name}>{name}</h2>
        <div className={styles.card__types}>
          {displayNewTypes
            ? types.map((item: PokemonType) => {
                return (
                  <span
                    key={item.type.name}
                    style={{
                      backgroundColor: PokemonTypeMapping[item.type.name].color,
                    }}
                  >
                    {item.type.name}
                  </span>
                );
              })
            : pastTypes[0].types.map((item: PokemonType) => {
                return (
                  <span
                    key={item.type.name}
                    style={{
                      backgroundColor: PokemonTypeMapping[item.type.name].color,
                    }}
                  >
                    {item.type.name}
                  </span>
                );
              })}
        </div>
      </article>
    </Link>
  );
};

export default Card;
