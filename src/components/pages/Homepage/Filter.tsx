import React, { useContext } from "react";
import { GenerationFilterContext } from "../../helpers/context";
import styles from "./Homepage.module.scss";

const Filter = () => {
  const context = useContext(GenerationFilterContext);

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.generationFilter}>
        <legend>Select types by generation:</legend>
        <div>
          <label>
            <input
              type="radio"
              name="genTypes"
              onClick={() => context?.setValue(6)}
              defaultChecked
            />
            6+
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="genTypes"
              onClick={() => context?.setValue(5)}
            />
            2-5
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="genTypes"
              onClick={() => context?.setValue(1)}
            />
            1
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
