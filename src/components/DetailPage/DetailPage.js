import React from "react";

const DetailPage = (props) => {
  const { data } = props;
  return <div>Pokemon: {JSON.stringify(data)}</div>;
};

export default DetailPage;
