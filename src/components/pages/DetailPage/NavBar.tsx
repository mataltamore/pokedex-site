import React from "react";
import Link from "next/link";
import Image from "next/image";

import ArrowBackIcon from "/public/images/arrow-back-icon.svg";

import { ColorMapping } from "../../../globals/utils";

import styles from "./DetailPage.module.scss";

type NavBarProps = { color: ColorMapping; name: string; id: number };

const NavBar = (props: NavBarProps) => {
  const { color, name, id } = props;

  return (
    <nav className={styles.navbar} style={{ backgroundColor: color }}>
      <Link href="/" passHref>
        <div className={styles.navbar__backbutton}>
          <Image src={ArrowBackIcon} alt="back arrow" layout="fill" />
        </div>
      </Link>
      <h1 className={styles.navbar__name}>{name}</h1>
      <span className={styles.navbar__number}>
        <p>Number</p>
        {id}
      </span>
    </nav>
  );
};

export default NavBar;
