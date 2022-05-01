import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Homepage.module.scss";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type CompleteData = {
  id: number;
  name: string;
  types: Array<{ name: string }>;
  sprite: string;
};

interface IProps {
  name: string;
  isActive?: boolean;
}

const Card = (props: InferGetServerSidePropsType<GetServerSideProps>) => {
  const { data } = props;

  const typeColor = [
    { type: "normal", color: "rgb(168, 168, 120)" },
    { type: "fire", color: "rgb(240, 128, 48)" },
    { type: "fighting", color: "rgb(192, 48, 40)" },
    { type: "water", color: "rgb(104, 144, 240)" },
    { type: "flying", color: "rgb(168, 144, 240)" },
    { type: "grass", color: "rgb(120, 200, 80)" },
    { type: "poison", color: "rgb(160, 64, 160)" },
    { type: "electric", color: "rgb(248, 208, 48)" },
    { type: "ground", color: "rgb(224, 192, 104)" },
    { type: "psychic", color: "rgb(248, 88, 136)" },
    { type: "rock", color: "rgb(184, 160, 56)" },
    { type: "ice", color: "rgb(152, 216, 216)" },
    { type: "bug", color: "rgb(168, 184, 32)" },
    { type: "dragon", color: "rgb(112, 56, 248)" },
    { type: "ghost", color: "rgb(112, 88, 152)" },
    { type: "dark", color: "rgb(112, 88, 72)" },
    { type: "steel", color: "rgb(184, 184, 208)" },
    { type: "fairy", color: "rgb(238, 153, 172)" },
  ];

  return (
    <>
      <div className={styles.cardItems}>
        {data.map((pkm: CompleteData) => {
          return (
            <div className={styles.singleItem}>
              <div className={styles.singleItem__id}>#{pkm.id}</div>
              <div className={styles.singleItem__image}>
                <Image src={pkm.sprite} height={200} width={200} />
              </div>
              <div className={styles.singleItem__name}>{pkm.name}</div>
              <div>
                {pkm.types.map((type) => (
                  <div
                    style={{
                      backgroundColor: typeColor.map((col) =>
                        type.name === col.type ? col.color : "none"
                      ),
                    }}
                    className={styles.singleItem__types}
                  >
                    {type.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const Homepage: React.FC<IProps> = ({
  data,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  return (
    <div>
      <div>logo</div>
      <div>search bar</div>
      <div>pokemon grid</div>
      <div></div>
      <Card data={data} />
    </div>
  );
};

export default Homepage;
