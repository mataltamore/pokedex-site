import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.scss";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type CompleteData = {
  id: number;
  name: string;
  types: Array<{ name: string }>;
  sprite: string;
};

const Homepage = ({
  data,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  return (
    <>
      {data.map((mon: CompleteData) => {
        return <div key={mon.id}>{JSON.stringify(mon)}</div>;
      })}
    </>
  );
};

export default Homepage;
