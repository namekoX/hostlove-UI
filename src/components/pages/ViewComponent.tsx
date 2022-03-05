import Const from "components/common/const";
import { Box, Grid } from "@material-ui/core";
import { useAxios } from "hooks/useAxios";
import { useEffect, useState } from "react";
import { iterateRender } from "components/common/utils";
import { LinkText } from "components/parts/LinkText";
import { Br } from "components/parts/Br";

type RecentResponse = {
  url: string;
  name: string;
  count: number;
};

const ViewComponent = () => {
  const getList = useAxios<RecentResponse[], any>({
    method: "GET",
    url: Const.URLS.GET_RECENT,
  });

  const [recentData, setRecentData] = useState<RecentResponse[]>([]);

  useEffect(() => {
    getList.fetchData({
      params: {},
      onLoad: (response) => {
        setRecentData(response);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wrapper = (row: RecentResponse) => {
    return (
      <div className={"link-text"}>
        <LinkText
          text={row.name + "(" + row.count + ")"}
          to={
            Const.SITE_ROOT +
            row.url.replace("https://", "").split("/").join("_")
          }
        />
      </div>
    );
  };

  return (
    <div className="view-body">
      <Grid container spacing={2}>
        <Box className={"title"}>最近見られたスレッド</Box>
        <Br count={2} />
        {recentData &&
          recentData.length > 0 &&
          iterateRender({ wrapper, array: recentData, key: "url" })}
      </Grid>
    </div>
  );
};

export default ViewComponent;
