import React from "react";
import { UseFormSetValue } from "react-hook-form";
import Const from "./const";

/**
 * 環境に応じたホスト名を返却する。
 * @return ホスト名
 */
export function getHost() {
  if (process.env.NODE_ENV === "production") {
    return Const.PRODUCT_HOST;
  } else {
    return Const.TEST_HOST;
  }
}

/**
 * 環境に応じたグーグルアナリティクスのIDを返却する。
 * @return アナリティクスのID
 */
export function getGAID() {
  if (process.env.NODE_ENV === "production") {
    return Const.GAID;
  } else {
    return "";
  }
}

/**
 * 現在のページ情報をもとにアナリティクスにデータを送信する。
 */
export function gtagconfig() {
  window.gtag("config", getGAID(), {
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
  });
}

/**
 * 文字列が有効かどうかを判別する。
 * @param params 検索する文字列
 * @return true:無効 false:有効
 */
export function isEnptystr(str: string | null | undefined) {
  return str == null || str === undefined || str === "undefined" || str === "";
}

/**
 * 数値が有効かどうかを判別する。
 * @param params 検索する数値
 * @return true:無効 false:有効
 */
export function isEnptynum(i: number | null | undefined) {
  return i == null || i === undefined || i === 0;
}

/**
 * 日付を”yyyy-mm-dd”形式の文字列に変換する。
 * @param params 変換する日付
 * @return 変換後の文字列
 */
export function formatDate(date: Date | undefined | null) {
  if (date === undefined || date === null) {
    return "";
  } else {
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  }
}

/**
 * 日付を”YYYYMM”形式の文字列に変換する。
 * @param params 変換する日付
 * @return 変換後の文字列
 */
export function formatDateYYYYMM(date: Date) {
  if (date === undefined || date === null) {
    return "";
  } else {
    return (
      date.getFullYear().toString().padStart(4, "0") +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0")
    );
  }
}

/**
 * 日付を”YYYYMMhhmmss”形式の文字列に変換する。
 * @param params 変換する日付
 * @return 変換後の文字列
 */
export function formatDateYYYYMMhhmmss(date: Date) {
  if (date === undefined || date === null) {
    return "";
  } else {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds()
    );
  }
}

export const setValues = (data: any, setValue: UseFormSetValue<any>) => {
  for (let key in data) {
    setValue(key, data[key]);
  }
};

// 改行コードをBRタグに変換する
export const convertNewLineCode = (txt: string) => {
  const texts = txt.split("\n").map((item, index) => {
    return (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    );
  });
  return <div>{texts}</div>;
};

// 配列項目を描画する
let counter = 0;
export const iterateRender = (props: {
  wrapper: any;
  array: any[];
  key: string;
}) => {
  const items: any = [];
  counter = counter + 1;
  props.array.forEach((row) => {
    items.push(
      <span key={row[props.key] + counter.toString()}>
        {props.wrapper(row)}
      </span>
    );
  });
  return <>{items}</>;
};

// 配列をソートする
export const sortArray = (props: {
  array: any[];
  option: "asc" | "desc";
  key: string;
}) => {
  return props.option === "asc"
    ? props.array.sort((a, b) => a[props.key] - b[props.key])
    : props.array.sort((a, b) => b[props.key] - a[props.key]);
};

// 前０をつける
export function zeroPadding(num: number, len: number) {
  return (Array(num).join("0") + num).slice(-len);
}
