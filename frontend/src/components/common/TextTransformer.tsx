import { GameFunc } from "common-modules";
import React, { Fragment, ReactNode } from "react";
import { useSelector } from "react-redux";
import { GameSelector } from "../../store";
import styles from "../../styles/common/TextTransformer.module.scss";

const pattern = /{{(fail:.+?|success:.+?|name:.+?)}}/;

type TextTransformerProps = {
  children: string;
};

export default function TextTransformer(props: TextTransformerProps) {
  const names = useSelector(GameSelector.names);
  const colors = GameFunc.util.getColorOrder(names);
  const splits: ReactNode[] = props.children.split(pattern);

  for (let i = 1; i < splits.length; i += 2) {
    const split = splits[i] as string;
    if (split.startsWith("fail:")) {
      const substr = split.substring("fail:".length);
      splits[i] = (
        <span className={styles.fail} key={i}>
          {substr}
        </span>
      );
    } else if (split.startsWith("success:")) {
      const substr = split.substring("success:".length);
      splits[i] = (
        <span className={styles.success} key={i}>
          {substr}
        </span>
      );
    } else if (split.startsWith("name:")) {
      const substr = split.substring("name:".length);
      const num = parseInt(substr, 10);
      if (names[num] !== undefined && colors[num] !== undefined) {
        const name = names[num];
        const color = colors[num];
        splits[i] = (
          <span className={styles[color]} key={i}>
            {name}
          </span>
        );
      } else {
        splits[i] = "undefined";
      }
    }
  }

  return <Fragment>{splits}</Fragment>;
}
