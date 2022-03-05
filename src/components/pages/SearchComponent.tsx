import { useForm } from "react-hook-form";
import { Text } from "components/parts/Text";
import { Box, Grid } from "@material-ui/core";
import { useAxios } from "hooks/useAxios";
import { Helmet } from "react-helmet";
import Const from "components/common/const";
import { WithProgress } from "components/parts/WithProgress";
import { CommonResponse } from "components/common/commonTypes";
import { useEffect, useState } from "react";
import { WithErrorMsg } from "components/parts/WithErrorMsg";
import { CircularButton } from "components/parts/CircularButton";
import { Res } from "components/parts/BoadRow";
import { Boad } from "components/parts/Boad";
import { useValidate } from "hooks/useValidate";
import { useParams } from "react-router-dom";
import { gtagconfig } from "components/common/utils";

type FormValues = { resList: Res[] } & SearchResquest & SearchResponse;

type SearchResquest = {
  url: string;
};

type SearchResponse = {
  url: string;
  totalPage: number;
  nextPage: number;
  isExistDb: 0 | 1;
  currentNo: number;
  title: string;
} & CommonResponse;

type NextSearchResquest = {
  url: string;
  totalPage: number;
  currentPage: number;
  isExistDb: 0 | 1;
  currentNo: number;
  maxNo: number;
};

type NextSearchResponse = {
  url: string;
  totalPage: number;
  nextPage: number;
  isExistDb: 0 | 1;
  currentNo: number;
  maxNo: number;
  resList: Res[];
} & CommonResponse;

const initVal = {
  url: "",
  totalPage: 0,
  nextPage: 0,
};

const nextReqInitVal: NextSearchResquest = {
  url: "",
  totalPage: 0,
  currentPage: 0,
  isExistDb: 0,
  currentNo: 0,
  maxNo: 0,
};

const SearchComponent = () => {
  const { control, getValues, setValue } = useForm<FormValues>({
    defaultValues: initVal,
    mode: "onChange",
  });
  const [isProgressLoad, setProgressLoad] = useState<boolean>(false);
  const [usedUrl, setusedUrl] = useState<string>("");
  const [dispContent, setDispContent] = useState<boolean>(true);
  const [nextReq, setNextReq] = useState<NextSearchResquest>(nextReqInitVal);

  const { pageId } = useParams();
  useEffect(() => {
    if (pageId) {
      setValue("url", "https://" + pageId.split("_").join("/"));
      setTimeout(hundleClick, 0);
    }
    gtagconfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

  const hundleClick = () => {
    setProgressLoad(true);
    setValue("resList", []);
    setValue("nextPage", 0);
    setValue("totalPage", 0);
    setValue("status", 0);
    setValue("msg", "");
    setValue("title", "");
    setusedUrl("");
    setDispContent(false);

    const params = {
      url: getValues().url,
    };
    if (!getValues().url) {
      setValue("status", 1);
      setValue("msg", valid.msg[0]);
      setProgressLoad(false);
      return;
    }
    setusedUrl(getValues().url);
    getFirst.fetchData({
      params: params,
      onLoad: (response) => {
        setValue("totalPage", response.totalPage);
        setValue("status", response.status);
        setValue("title", response.title);
        if (response.status === 0) {
          setNextReq({
            url: response.url,
            totalPage: response.totalPage,
            currentPage: response.nextPage || 1,
            isExistDb: response.isExistDb,
            currentNo: response.currentNo || 0,
            maxNo: 0,
          });
          setTimeout(afterLoad, Const.REQ_INTERVAL);
        } else {
          setProgressLoad(false);
          setValue("msg", response.msg);
        }
      },
    });
  };

  const getFirst = useAxios<SearchResponse, SearchResquest>({
    method: "GET",
    url: Const.URLS.GET_FIRST,
    setValue,
  });

  const getNext = useAxios<NextSearchResponse, NextSearchResquest>({
    method: "GET",
    url: Const.URLS.GET_NEXT,
    setValue,
  });

  const valid = useValidate<SearchResquest>({
    rules: [{ name: "url", label: "url", require: true }],
  });

  useEffect(() => {
    if (nextReq.currentPage > 0) {
      if (nextReq.currentPage > nextReq.totalPage) {
        setProgressLoad(false);
        setNextReq(nextReqInitVal);
      } else {
        setProgressLoad(true);
        setTimeout(afterLoad, Const.REQ_INTERVAL);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextReq]);

  const afterLoad = () => {
    getNext.fetchData({
      params: {
        ...nextReq,
      },
      onLoad: (response) => {
        if (response.status === 0) {
          setValue("totalPage", response.totalPage);
          setValue("nextPage", response.nextPage);
          const resList = getValues().resList || [];
          setValue("resList", resList.concat(response.resList));
          setValue("status", response.status);
          setNextReq({
            url: response.url,
            totalPage: response.totalPage,
            currentPage: response.nextPage,
            isExistDb: response.isExistDb,
            currentNo: response.currentNo,
            maxNo: response.maxNo,
          });
        } else {
          setProgressLoad(false);
          setValue("msg", response.msg);
        }
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>
          {Const.SITE_NAME + (getValues().title ? "-" + getValues().title : "")}
        </title>
      </Helmet>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <p>
            {dispContent &&
              "初めて読み込むページは全レス読み込みに行くため、少し時間がかかります。"}
          </p>
        </Grid>
        <Grid item xs={12}>
          <Text
            label="展開するURL"
            control={control}
            name="url"
            placeholder={
              "(例) https://kanto.hostlove.com/fuat/20220224163355/1"
            }
            width="500px"
            enterKeyEvent={hundleClick}
            className={"input-box"}
          />
        </Grid>
        <Grid item xs={4}>
          <CircularButton
            variant="contained"
            onClick={hundleClick}
            label="展開する"
            isLoading={isProgressLoad}
            className={"tenkai-button"}
          />
        </Grid>
      </Grid>
      <WithErrorMsg
        status={getValues().status || 0}
        msg={getValues().msg || "データ取得で想定外のエラーが発生しました。"}
      >
        <WithProgress
          isLoading={isProgressLoad}
          progress={getValues().nextPage || 0}
          total={getValues().totalPage || 1}
        >
          {getValues().resList && (
            <>
              <Box className={"title"}>
                元スレッド :{" "}
                <a href={usedUrl} target={"_blank"} rel="noreferrer">
                  {getValues().title}
                </a>
              </Box>
              <Boad resList={getValues().resList} />
            </>
          )}
        </WithProgress>
      </WithErrorMsg>
    </>
  );
};
export default SearchComponent;
