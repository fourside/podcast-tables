import { FC } from "react";
import classes from "./loading.module.css";

export const Loading: FC = () => {
  return (
    <div className={classes.outer}>
      <div className={classes.inner} />
    </div>
  );
};
