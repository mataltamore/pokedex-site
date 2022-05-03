import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import styles from "./Pokemon.module.scss";
import { Value } from "sass";

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

const Pokemon = () => {
  const [game, setGame] = useState("Gioco default");
  const [showMenu, setShowMenu] = useState(false);

  const [topPage, setTopPage] = useState(false);
  useEffect(() => {
    if (topPage) {
      window.scrollTo(0, 0);
      setTopPage(!topPage);
    }
  }, [topPage]);

  return (
    <>
      <div className={styles.navBar}>
        <span className={styles.navBar__backHomepage}>Back</span>
        <span className={styles.navBar__currentPokemonName}>Nome pokemon</span>
        <span className={styles.navBar__currentPokemonNumber}>#id</span>
      </div>
      <div className={styles.baseInfo}>
        <div className={styles.baseInfo__grid}>
          <div className={styles.baseInfo__grid__column}>
            <div>
              <div>Type</div>
              <div>Ability</div>
            </div>
            <div>
              <div>type_var</div>
              <div>ability_var</div>
            </div>
          </div>
          <div className={styles.baseInfo__grid__column}>
            <div>
              <div>Weight</div>
              <div>weight_var</div>
            </div>
            <div>
              <div>Height</div>
              <div>height_var</div>
            </div>
          </div>
        </div>
        <div className={styles.baseInfo__description}>
          <div>Image</div>

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
      <div className={styles.specie}>Info Specie - scrollarea</div>
      <div className={styles.moves}>Moves Pool - scrollarea </div>

      <div className={styles.footer}>
        <div className={styles.footer__btns}>
          <button className={styles.footer__btns__backBtn}>Back btn</button>

          <button
            className={styles.footer__btns__topBtn}
            onClick={() => setTopPage(!topPage)}
          >
            Top btn
          </button>
        </div>

        <div className={styles.footer__changeGame}>
          <GameMenu game={game} showMenu={showMenu} setShowMenu={setShowMenu}>
            <ul className={styles.footer__changeGame__list}>
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
