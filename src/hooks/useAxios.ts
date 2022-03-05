import { useState } from "react";
import axios, { AxiosError } from "axios";
import { getHost } from "components/common/utils";
import { UseFormSetValue } from "react-hook-form";

type IErrorResponse = {
  error: string;
};

export type useAxiosProps = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  setValue?: UseFormSetValue<any>;
};

export type useAxiosDataProps<T, S> = {
  data?: S;
  params?: S;
  headers?: any;
  onLoad?: (res: T) => void;
  onError?: (res: T) => void;
};

export const useAxios = <T, S>(props: useAxiosProps) => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  axios.defaults.baseURL = getHost();

  const { setValue, method, url } = props;

  const fetchData = async (props: useAxiosDataProps<T, S>) => {
    const {
      data,
      params,
      headers = { "Content-Type": "application/json", charset: "utf-8" },
      onLoad,
      onError,
    } = props;

    setLoading(true);

    axios({
      method,
      url,
      headers,
      params,
      data,
    })
      .then((res) => {
        setResponse(res.data);
        onLoad && onLoad(res.data);
        // TODO:ここでエラーと成功でonErrorとonLoadを使い分けたい。setValueでメッセージなども入れたい
      })
      // エラー応答の構造を明示する
      .catch((e: AxiosError<IErrorResponse>) => {
        if (e.response !== undefined) {
          setError(e.response.data.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { response, error, isLoading, fetchData };
};
