import { Grid } from "@material-ui/core";
import { convertNewLineCode } from "components/common/utils";
import React from "react";
import { AnkeredNo } from "./AnkeredNo";

export type Res = {
  res_no: number;
  res: string;
  name: string;
  posttime: string;
  isNew: 0 | 1;
  replys?: any[];
  anker?: any;
};

type Props = {
  res: Res;
  resList?: Res[];
  isLine: boolean;
};

export const BoadRow = (props: Props) => {
  const { res, resList, isLine } = props;

  const convertToAnker = (anker: any, txt: string) => {
    const texts = txt.split(anker[0]);
    if (texts[0] === "" && texts.length > 0) {
      let replys: Res[] = [];
      const target = Number(anker[0].replace(">>", "").replace("\n", ""));
      if (resList)
        replys.push(resList.filter((row) => row.res_no === target)[0]);
      if (replys.length === 0 || !replys[0]) return convertNewLineCode(txt);
      return (
        <React.Fragment>
          <AnkeredNo replys={replys} label={anker[0]} />
          {convertNewLineCode(texts[1])}
        </React.Fragment>
      );
    } else {
      return convertNewLineCode(txt);
    }
  };

  const replaceAnker = (anker: any, res: string) => {
    if (!anker || !resList) return convertNewLineCode(res);
    return convertToAnker(anker, res);
  };

  if (!res) {
    return <></>;
  }

  return (
    <div className={"boad-row"}>
      {isLine ? <hr /> : <></>}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AnkeredNo
            replys={res.replys || []}
            label={res.res_no.toString()}
          ></AnkeredNo>
        </Grid>
        <Grid item xs={12}>
          {replaceAnker(res.anker, res.res)}
        </Grid>
        <Grid item xs={12} className={"user-name"}>
          {res.name} {res.posttime}
        </Grid>
      </Grid>
    </div>
  );
};
