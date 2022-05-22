import React from "react";
import Link from "next/link";
import Image from "next/image";

import { PokemonTypeMapping } from "../../../globals/utils";
import { StaticPokeAPI, PokemonType } from "../../../globals/types";

import styles from "./Card.module.scss";

const Card = (props: StaticPokeAPI) => {
  const { id, name, types, past_types: pastTypes, sprites } = props;

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
          {types.map((item: PokemonType) => {
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
        {pastTypes.length > 0 && (
          <div className={styles.card__types}>
            {pastTypes[0].types.map((item: PokemonType) => {
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
        )}
      </article>
    </Link>
  );
};

export default Card;
