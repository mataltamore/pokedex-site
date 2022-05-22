import React from "react";
import Link from "next/link";
import Image from "next/image";

import ArrowBackIcon from "/public/images/arrow-back-icon.svg";

import styles from "./DetailPage.module.scss";

type NavBarProps = {
  color: string;
  secondColor: string;
  name: string;
  id: number;
};

const NavBar = (props: NavBarProps) => {
  const { color, secondColor, name, id } = props;

  return (
    <nav
      className={styles.navbar}
      style={{
        backgroundColor: color,
        background: `linear-gradient(72deg, ${color} 35%, ${secondColor} 65%)`,
      }}
    >
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
