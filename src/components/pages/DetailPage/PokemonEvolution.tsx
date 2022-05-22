import React from "react";
import Image from "next/image";

import styles from "./DetailPage.module.scss";

export type PokemonEvolutionProps = {
  color: string;
  name: string;
  image: string;
};

const PokemonEvolution = (props: PokemonEvolutionProps) => {
  const { color, name, image } = props;
  return (
    <section className={styles.evolutionsWrapper}>
      <h2 className={styles.evolutionsWrapper__title} style={{ color: color }}>
        Evolution Chain
      </h2>
      <div>
        <div className={styles.evolutionCard}>
          <div className={styles.evolutionCard__image}>
            <Image
              src={image}
              alt="search-image"
              loading="lazy"
              layout="fill"
            />
          </div>
          <p
            className={styles.evolutionCard__name}
            style={{ backgroundColor: color }}
          >
            {name}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PokemonEvolution;
